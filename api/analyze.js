const MAX_BODY_BYTES = 11 * 1024 * 1024;

const nullableNumber = { anyOf: [{ type: "number" }, { type: "null" }] };
const nullableInteger = { anyOf: [{ type: "integer" }, { type: "null" }] };

const schema = {
  type: "object",
  additionalProperties: false,
  properties: {
    observation_id: { type: "string" },
    estimated_total_birds: { type: "integer", minimum: 0, maximum: 100000 },
    visible_groups: { type: "integer", minimum: 0, maximum: 500 },
    primary_taxon: { type: "string" },
    species_or_groups: { type: "integer", minimum: 0, maximum: 100 },
    overall_confidence: { type: "number", minimum: 0, maximum: 1 },
    anomaly_level: { type: "string", enum: ["low", "moderate", "high", "insufficient_data"] },
    anomaly_score: { type: "integer", minimum: 0, maximum: 100 },
    summary: { type: "string" },
    environmental_signals: { type: "array", maxItems: 8, items: { type: "string" } },
    historical_comparison: {
      type: "object",
      additionalProperties: false,
      properties: {
        baseline_available: { type: "boolean" },
        arrival_timing_delta_days: nullableInteger,
        abundance_delta_percent: nullableNumber,
        water_level_delta: { type: "string" },
        interpretation: { type: "string" }
      },
      required: ["baseline_available", "arrival_timing_delta_days", "abundance_delta_percent", "water_level_delta", "interpretation"]
    },
    climate_response_index: {
      type: "object",
      additionalProperties: false,
      properties: {
        score: { type: "integer", minimum: 0, maximum: 100 },
        level: { type: "string", enum: ["low", "moderate", "high", "insufficient_data"] },
        confidence: { type: "number", minimum: 0, maximum: 1 },
        components: {
          type: "object",
          additionalProperties: false,
          properties: {
            phenology: { type: "integer", minimum: 0, maximum: 100 },
            abundance: { type: "integer", minimum: 0, maximum: 100 },
            habitat: { type: "integer", minimum: 0, maximum: 100 },
            weather: { type: "integer", minimum: 0, maximum: 100 }
          },
          required: ["phenology", "abundance", "habitat", "weather"]
        },
        interpretation: { type: "string" }
      },
      required: ["score", "level", "confidence", "components", "interpretation"]
    },
    observed_behaviors: { type: "array", maxItems: 8, items: { type: "string" } },
    recommended_action: { type: "string" },
    limitations: { type: "array", minItems: 2, maxItems: 8, items: { type: "string" } },
    detections: {
      type: "array",
      maxItems: 14,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          label: { type: "string" },
          estimated_count: { type: "integer", minimum: 0, maximum: 100000 },
          confidence: { type: "number", minimum: 0, maximum: 1 },
          behavior: { type: "string" },
          bbox: { type: "array", minItems: 4, maxItems: 4, items: { type: "number", minimum: 0, maximum: 100 } }
        },
        required: ["label", "estimated_count", "confidence", "behavior", "bbox"]
      }
    }
  },
  required: [
    "observation_id", "estimated_total_birds", "visible_groups", "primary_taxon", "species_or_groups",
    "overall_confidence", "anomaly_level", "anomaly_score", "summary", "environmental_signals",
    "historical_comparison", "climate_response_index", "observed_behaviors", "recommended_action",
    "limitations", "detections"
  ]
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ code: "OPENAI_NOT_CONFIGURED", error: "OPENAI_API_KEY is not configured." });
  }

  try {
    const contentLength = Number(req.headers["content-length"] || 0);
    if (contentLength > MAX_BODY_BYTES) return res.status(413).json({ error: "Request is too large." });
    const { image, context } = req.body || {};
    if (!isValidImageDataUrl(image)) return res.status(400).json({ error: "A valid JPG, PNG, or WEBP data URL is required." });
    if (!context || typeof context !== "object" || !context.area?.area_id) return res.status(400).json({ error: "A valid bioclimatic area context is required." });

    const outputLanguage = context.language === "en" ? "English" : "Spanish";
    const prompt = `You are the conservative multimodal observation engine for MigrAves Climate Sentinel, a research-support prototype that creates Migratory Bioclimatic Records (RBM/MBR).

Your task is to convert visible evidence plus supplied area, sensor, and historical metadata into a structured observation. The result may support later research, but it is not a scientific conclusion by itself.

Non-negotiable rules:
1. Never claim that one observation proves climate change, climate causality, a population trend, or a weather forecast.
2. Never predict tornadoes, earthquakes, or other hazards from bird behavior.
3. Never infer emotions, intentions, or internal states. Use only observable behavior classes: feeding, resting, flight, flocking, escape response, preening, thermoregulation, territorial interaction, or unknown.
4. Species identification is tentative unless visually distinctive. Prefer broad taxonomic or functional groups when image quality is insufficient.
5. Count individuals only when reasonably visible; otherwise estimate flock size and lower confidence.
6. Bounding boxes use [x, y, width, height] percentages from 0 to 100 relative to the full image.
7. Acoustic values are metadata from a separate sensor. No audio was supplied. Do not claim direct call identification.
8. Historical deltas must be grounded in the supplied area baseline. If the baseline cannot support a quantitative delta, return null and explain why.
9. The Climate Biological Response Index (IRBC/BCRI) is experimental. Score it from 0 to 100 using four explicit components:
   - phenology: timing shift relative to baseline;
   - abundance: count shift relative to baseline;
   - habitat: water/soil/habitat condition signal;
   - weather: temperature, wind, rainfall, pressure, and other supplied weather anomalies.
   If evidence is insufficient, use level "insufficient_data", a low score, and low confidence.
10. State limitations and recommend repeated comparable sampling, calibration, statistical analysis, and specialist validation.
11. Every taxon, count, behavior, box, historical delta, anomaly, and IRBC value is an estimate pending human validation.
12. Write all natural-language fields in ${outputLanguage}.

Area and observation context:
${JSON.stringify(context, null, 2)}`;

    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.6-terra",
        reasoning: { effort: "medium" },
        input: [{
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            { type: "input_image", image_url: image, detail: "high" }
          ]
        }],
        text: { format: { type: "json_schema", name: "migraves_climate_record_observation", strict: true, schema } },
        max_output_tokens: 5200
      })
    });

    const payload = await openaiResponse.json();
    if (!openaiResponse.ok) {
      console.error("OpenAI error", payload);
      return res.status(openaiResponse.status >= 500 ? 502 : 400).json({ error: payload?.error?.message || "OpenAI analysis failed." });
    }

    const outputText = payload.output_text || extractOutputText(payload);
    if (!outputText) return res.status(502).json({ error: "The model returned no structured output." });

    let result;
    try { result = JSON.parse(outputText); }
    catch { return res.status(502).json({ error: "The model returned invalid structured output." }); }

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ result, model: payload.model || process.env.OPENAI_MODEL || "gpt-5.6-terra" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unexpected server error." });
  }
}

function isValidImageDataUrl(value) {
  return typeof value === "string" && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(value);
}

function extractOutputText(payload) {
  const parts = [];
  for (const item of payload.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) parts.push(content.text);
    }
  }
  return parts.join("\n");
}
