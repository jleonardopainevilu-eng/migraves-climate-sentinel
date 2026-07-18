const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const STORAGE_AREAS = "migraves_climate_areas_v1";
const STORAGE_RECORDS = "migraves_climate_records_v1";

const defaultAreas = {
  chamiza: {
    id: "chamiza",
    code: "ABM-CHM-001",
    name: "Humedal de Chamiza",
    region: "Los Lagos, Chile",
    ecosystem: "coastal_wetland",
    coordinates: { latitude: -41.4807, longitude: -72.8403, radius_km: 1.2 },
    priority_species: ["Zarapitos", "Aves playeras migratorias"],
    baseline_period: "2016-2025",
    baseline: "Llegada habitual entre el 12 y el 20 de octubre; mediana histórica de 80 aves durante esta ventana; nivel de agua normalmente estable.",
    coordinator_role: "research_team",
    data_access: "open",
    description: {
      es: "Área costera para observar fenología, abundancia y respuesta a variaciones de marea.",
      en: "Coastal area for observing phenology, abundance, and response to tidal variation."
    },
    readings: { temperature: 12.8, humidity: 81, pressure: 1006.4, wind: 18.2, rainfall: 4.6, uv: 2.1, soil: 63, water: "low", acoustic: 27, acousticGroup: "Aves playeras / shorebirds" },
    alert: { score: 72, label: { es: "Alteración moderada", en: "Moderate alteration" } },
    demo: {
      observation_id: "OBS-CHM-DEMO-001",
      estimated_total_birds: 96,
      visible_groups: 4,
      primary_taxon: "Aves playeras, identificación tentativa",
      species_or_groups: 3,
      overall_confidence: 0.86,
      anomaly_level: "moderate",
      anomaly_score: 72,
      summary: {
        es: "La observación simulada combina una llegada aproximadamente ocho días adelantada, abundancia superior a la mediana indicada y bajo nivel de agua. Es una señal para seguimiento repetido, no evidencia aislada de causalidad climática.",
        en: "The simulated observation combines an arrival approximately eight days early, abundance above the supplied median, and low water level. It is a signal for repeated monitoring, not isolated evidence of climate causality."
      },
      environmental_signals: {
        es: ["Temperatura +2,1 °C sobre referencia", "Nivel de agua bajo", "27 eventos acústicos/min", "Viento del noroeste"],
        en: ["Temperature +2.1 °C above reference", "Low water level", "27 acoustic events/min", "Northwesterly wind"]
      },
      historical_comparison: {
        baseline_available: true,
        arrival_timing_delta_days: -8,
        abundance_delta_percent: 20,
        water_level_delta: "-12% estimado",
        interpretation: {
          es: "La señal combina adelanto fenológico y abundancia superior a la referencia. Se requieren observaciones comparables durante al menos siete días y validación taxonómica.",
          en: "The signal combines earlier phenology and abundance above reference. Comparable observations for at least seven days and taxonomic validation are required."
        }
      },
      climate_response_index: {
        score: 72,
        level: "moderate",
        confidence: 0.79,
        components: { phenology: 78, abundance: 56, habitat: 74, weather: 68 },
        interpretation: {
          es: "El IRBC experimental prioriza el adelanto de llegada y el estado del hábitat. No constituye un índice climático oficial.",
          en: "The experimental BCRI is driven mainly by earlier arrival and habitat condition. It is not an official climate index."
        }
      },
      observed_behaviors: ["forrajeo", "descanso", "desplazamiento en bandada"],
      recommended_action: {
        es: "Repetir conteos a la misma hora durante siete días, verificar la identificación con un especialista y contrastar con marea y registros históricos del área.",
        en: "Repeat counts at the same time for seven days, verify identification with a specialist, and compare with tide and area history."
      },
      limitations: {
        es: ["Imagen y sensores de demostración.", "Las cajas y conteos son estimaciones visuales.", "Los metadatos acústicos son simulados; no se analizó audio.", "Una observación aislada no demuestra cambio climático."],
        en: ["Demo image and sensor data.", "Boxes and counts are visual estimates.", "Acoustic metadata is simulated; no audio was analyzed.", "A single observation does not prove climate change."]
      },
      detections: [
        { label: "Aves playeras pequeñas", estimated_count: 48, confidence: 0.88, behavior: "Forrajeo en borde de agua", bbox: [8, 57, 39, 23] },
        { label: "Zarapitos, identificación tentativa", estimated_count: 24, confidence: 0.79, behavior: "Descanso y vigilancia", bbox: [50, 50, 27, 27] },
        { label: "Bandada en vuelo", estimated_count: 24, confidence: 0.90, behavior: "Desplazamiento coordinado", bbox: [25, 15, 49, 25] }
      ]
    }
  },
  maullin: {
    id: "maullin",
    code: "ABM-MLN-001",
    name: "Humedales del río Maullín",
    region: "Los Lagos, Chile",
    ecosystem: "estuary",
    coordinates: { latitude: -41.6175, longitude: -73.6008, radius_km: 1.5 },
    priority_species: ["Anátidas", "Aves costeras"],
    baseline_period: "2016-2025",
    baseline: "Mediana histórica de 65 aves; paso principal durante la segunda quincena de octubre; abundancia variable con marea.",
    coordinator_role: "research_team",
    data_access: "open",
    description: { es: "Área de estuario para comparar abundancia, viento y uso de planicies intermareales.", en: "Estuary area for comparing abundance, wind, and intertidal-flat use." },
    readings: { temperature: 13.6, humidity: 76, pressure: 1009.8, wind: 22.5, rainfall: 1.2, uv: 3.4, soil: 58, water: "normal", acoustic: 19, acousticGroup: "Anátidas y aves costeras" },
    alert: { score: 38, label: { es: "Señal baja", en: "Low signal" } },
    demo: null
  },
  chiloe: {
    id: "chiloe",
    code: "ABM-CHI-001",
    name: "Humedal costero de Chiloé",
    region: "Los Lagos, Chile",
    ecosystem: "coastal_wetland",
    coordinates: { latitude: -42.4760, longitude: -73.7650, radius_km: 1.3 },
    priority_species: ["Zarapitos", "Aves costeras mixtas"],
    baseline_period: "2016-2025",
    baseline: "Llegada habitual en octubre; conteo mediano de 74 aves; alta sensibilidad a lluvia y nivel de agua.",
    coordinator_role: "research_team",
    data_access: "restricted",
    description: { es: "Área insular para detectar diferencias temporales entre costa continental e isla.", en: "Island area for detecting timing differences between mainland and island coasts." },
    readings: { temperature: 11.9, humidity: 85, pressure: 1004.2, wind: 14.7, rainfall: 7.8, uv: 1.7, soil: 71, water: "high", acoustic: 31, acousticGroup: "Aves costeras mixtas" },
    alert: { score: 61, label: { es: "Revisión sugerida", en: "Review suggested" } },
    demo: null
  }
};

const areas = { ...structuredClone(defaultAreas), ...loadStoredAreas() };

const state = {
  language: "es",
  selectedArea: "chamiza",
  imageDataUrl: null,
  imageName: null,
  imageSource: null,
  result: null,
  recordId: null,
  mode: null,
  model: null,
  validation: createPendingValidation()
};

function createPendingValidation() {
  return { status: "pending", reviewer_name: "", reviewer_role: "", corrected_taxon: "", note: "", reviewed_at: null };
}

function loadStoredAreas() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_AREAS) || "[]");
    return Object.fromEntries(stored.filter((item) => item?.id && item?.code).map((item) => [item.id, item]));
  } catch {
    return {};
  }
}

function saveStoredAreas() {
  const custom = Object.values(areas).filter((area) => !defaultAreas[area.id]);
  localStorage.setItem(STORAGE_AREAS, JSON.stringify(custom));
}

function localText(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value[state.language] || value.es || value.en || "";
  return value ?? "";
}

function localTextArray(value) {
  if (Array.isArray(value)) return value;
  const selected = localText(value);
  return Array.isArray(selected) ? selected : selected ? [selected] : [];
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  $$('[data-es][data-en]').forEach((el) => {
    const text = el.dataset[state.language];
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") el.placeholder = text;
    else el.textContent = text;
  });
  $("#languageToggle").textContent = state.language === "es" ? "EN" : "ES";
  renderAreaCards();
  populateAreaSelect();
  updateAreaPreview();
  renderRegistry();
  if (state.result) renderResult(state.result);
}

function ecosystemLabelFor(value, language) {
  const map = {
    es: { coastal_wetland: "Humedal costero", estuary: "Estuario", forest: "Bosque", river: "Río", coast: "Costa", other: "Otro" },
    en: { coastal_wetland: "Coastal wetland", estuary: "Estuary", forest: "Forest", river: "River", coast: "Coast", other: "Other" }
  };
  return map[language]?.[value] || value;
}

function ecosystemLabel(value) {
  return ecosystemLabelFor(value, state.language);
}

function accessLabel(value) {
  const map = { es: { open: "Abierto", restricted: "Restringido", sensitive: "Sensible" }, en: { open: "Open", restricted: "Restricted", sensitive: "Sensitive" } };
  return map[state.language][value] || value;
}

function renderAreaCards() {
  const container = $("#areaCards");
  container.innerHTML = Object.values(areas).map((area) => `
    <article class="node-card ${state.selectedArea === area.id ? "active" : ""}" data-area="${escapeHtml(area.id)}" tabindex="0" role="button">
      <div class="node-head"><div><span class="node-status">${escapeHtml(area.code)}</span><h3>${escapeHtml(area.name)}</h3></div><strong>${area.alert?.score ?? "—"}/100</strong></div>
      <p>${escapeHtml(localText(area.description) || `${ecosystemLabel(area.ecosystem)} · ${area.region}`)}</p>
      <div class="node-readings">
        <div><span>${state.language === "es" ? "ECOSISTEMA" : "ECOSYSTEM"}</span><strong>${escapeHtml(shortText(ecosystemLabel(area.ecosystem), 15))}</strong></div>
        <div><span>${state.language === "es" ? "RADIO" : "RADIUS"}</span><strong>${area.coordinates.radius_km} km</strong></div>
        <div><span>${state.language === "es" ? "ACCESO" : "ACCESS"}</span><strong>${escapeHtml(accessLabel(area.data_access))}</strong></div>
      </div>
      <div class="node-alert"><span>${escapeHtml(localText(area.alert?.label) || (state.language === "es" ? "Área personalizada" : "Custom area"))}</span><b>${state.language === "es" ? "Seleccionar" : "Select"} →</b></div>
    </article>`).join("");

  $$(".node-card").forEach((card) => {
    const select = () => selectArea(card.dataset.area, true);
    card.addEventListener("click", select);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(); }
    });
  });
  $("#consoleAreaCount").textContent = Object.keys(areas).length;
}

function populateAreaSelect() {
  const select = $("#areaSelect");
  select.innerHTML = Object.values(areas).map((area) => `<option value="${escapeHtml(area.id)}">${escapeHtml(area.code)} · ${escapeHtml(area.name)}</option>`).join("");
  if (areas[state.selectedArea]) select.value = state.selectedArea;
}

function selectArea(id, scroll = false) {
  if (!areas[id]) return;
  state.selectedArea = id;
  populateAreaSelect();
  populateObservationFields(areas[id]);
  renderAreaCards();
  updateAreaPreview(areas[id]);
  $("#loadDemo").textContent = state.language === "es" ? `Cargar simulación de ${areas[id].name}` : `Load ${areas[id].name} simulation`;
  if (scroll) $("#laboratorio").scrollIntoView({ behavior: "smooth", block: "start" });
}

function populateObservationFields(area) {
  const readings = area.readings || { temperature: 12, humidity: 75, pressure: 1010, wind: 10, rainfall: 0, uv: 2, soil: 60, water: "normal", acoustic: 0, acousticGroup: area.priority_species?.join(", ") || "" };
  $("#temperature").value = readings.temperature ?? 12;
  $("#humidity").value = readings.humidity ?? 75;
  $("#pressure").value = readings.pressure ?? 1010;
  $("#windSpeed").value = readings.wind ?? 10;
  $("#rainfall").value = readings.rainfall ?? 0;
  $("#uvIndex").value = readings.uv ?? 2;
  $("#soilMoisture").value = readings.soil ?? 60;
  $("#waterLevel").value = readings.water || "normal";
  $("#acousticEvents").value = readings.acoustic ?? 0;
  $("#acousticGroup").value = readings.acousticGroup || area.priority_species?.join(", ") || "";
}

function readAreaForm() {
  return {
    id: slugify($("#areaCode").value || $("#areaName").value || `area-${Date.now()}`),
    code: sanitizeCode($("#areaCode").value),
    name: $("#areaName").value.trim(),
    region: $("#areaRegion").value.trim(),
    ecosystem: $("#ecosystemType").value,
    coordinates: {
      latitude: numberValue("#areaLatitude"),
      longitude: numberValue("#areaLongitude"),
      radius_km: numberValue("#areaRadius")
    },
    priority_species: $("#prioritySpecies").value.split(",").map((item) => item.trim()).filter(Boolean),
    baseline_period: $("#baselinePeriod").value.trim(),
    baseline: $("#areaBaseline").value.trim(),
    coordinator_role: $("#areaCoordinator").value,
    data_access: $("#dataAccess").value,
    description: {
      es: `${ecosystemLabelFor($("#ecosystemType").value, "es")} en ${$("#areaRegion").value.trim() || "ubicación por definir"}.`,
      en: `${ecosystemLabelFor($("#ecosystemType").value, "en")} in ${$("#areaRegion").value.trim() || "location to define"}.`
    },
    readings: { temperature: 12, humidity: 75, pressure: 1010, wind: 10, rainfall: 0, uv: 2, soil: 60, water: "normal", acoustic: 0, acousticGroup: $("#prioritySpecies").value.trim() },
    alert: { score: 0, label: { es: "Sin registros", en: "No records" } },
    demo: null,
    created_at: new Date().toISOString(),
    schema_version: "ABM-1.0"
  };
}

function createArea(event) {
  event.preventDefault();
  const area = readAreaForm();
  if (!area.code || !area.name || !Number.isFinite(area.coordinates.latitude) || !Number.isFinite(area.coordinates.longitude)) {
    return showToast(state.language === "es" ? "Completa nombre, código y coordenadas válidas." : "Complete name, code, and valid coordinates.");
  }
  if (Object.values(areas).some((item) => item.code === area.code && item.id !== area.id)) {
    return showToast(state.language === "es" ? "Ese código ABM ya existe." : "That MBA code already exists.");
  }
  areas[area.id] = area;
  saveStoredAreas();
  renderAreaCards();
  populateAreaSelect();
  selectArea(area.id, true);
  showToast(state.language === "es" ? `${area.code} creada y seleccionada.` : `${area.code} created and selected.`);
}

function resetAreaForm() {
  $("#areaForm").reset();
  $("#areaRadius").value = 1;
  updateAreaPreview();
}

function updateAreaPreview(area = null) {
  const hasInput = $("#areaName")?.value.trim() || $("#areaCode")?.value.trim();
  const preview = area || (hasInput ? readAreaForm() : areas[state.selectedArea]);
  if (!preview) return;
  $("#areaPreviewName").textContent = preview.code || "ABM-XXX-001";
  $("#areaPreviewEcosystem").textContent = ecosystemLabel(preview.ecosystem);
  const lat = preview.coordinates?.latitude;
  const lon = preview.coordinates?.longitude;
  $("#areaPreviewCoordinates").textContent = Number.isFinite(lat) && Number.isFinite(lon) ? `${lat.toFixed(4)}, ${lon.toFixed(4)}` : "—";
  $("#areaPreviewBaseline").textContent = preview.baseline_period || "—";
  $("#areaPreviewAccess").textContent = accessLabel(preview.data_access);
}

function exportSelectedArea() {
  const area = areas[state.selectedArea];
  if (!area) return;
  downloadBlob(JSON.stringify(toAbmObject(area), null, 2), `${area.code.toLowerCase()}-area.json`, "application/json");
}

function toAbmObject(area) {
  return {
    schema: "MigrAves-ABM",
    schema_version: "1.0",
    area_id: area.code,
    name: area.name,
    ecosystem_type: area.ecosystem,
    region: area.region,
    geometry: { type: "Point", coordinates: [area.coordinates.longitude, area.coordinates.latitude], monitored_radius_km: area.coordinates.radius_km },
    priority_species_or_groups: area.priority_species,
    historical_baseline: { period: area.baseline_period, description: area.baseline },
    governance: { primary_role: area.coordinator_role, data_access: area.data_access },
    created_at: area.created_at || null
  };
}

function setDefaultDate() {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  $("#observedAt").value = date.toISOString().slice(0, 16);
}

function handleFile(file) {
  if (!file) return;
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) return showToast(state.language === "es" ? "Selecciona una imagen JPG, PNG o WEBP." : "Select a JPG, PNG, or WEBP image.");
  if (file.size > 8 * 1024 * 1024) return showToast(state.language === "es" ? "La imagen supera 8 MB." : "The image exceeds 8 MB.");
  const reader = new FileReader();
  reader.onload = () => setImage(reader.result, file.name, "real");
  reader.readAsDataURL(file);
}

function setImage(dataUrl, name, source) {
  state.imageDataUrl = dataUrl;
  state.imageName = name;
  state.imageSource = source;
  state.mode = source === "real" ? "input" : "demo";
  $("#imagePreview").src = dataUrl;
  $("#dropPrompt").hidden = true;
  $("#previewWrap").hidden = false;
  $("#imageProvenance").className = `provenance ${source === "real" ? "measured" : "simulated"}`;
  $("#imageProvenance").textContent = source === "real" ? (state.language === "es" ? "IMAGEN REAL" : "REAL IMAGE") : (state.language === "es" ? "IMAGEN SIMULADA" : "SIMULATED IMAGE");
  clearCanvas();
}

function resetImage() {
  state.imageDataUrl = null;
  state.imageName = null;
  state.imageSource = null;
  $("#imageInput").value = "";
  $("#imagePreview").removeAttribute("src");
  $("#dropPrompt").hidden = false;
  $("#previewWrap").hidden = true;
  $("#imageProvenance").className = "provenance simulated";
  $("#imageProvenance").textContent = state.language === "es" ? "SIN DATOS" : "NO DATA";
  clearCanvas();
}

function demoSvg(area) {
  const groups = area.id === "chamiza"
    ? [[100,85,1.1],[260,120,.8],[385,80,.75],[470,150,.9],[185,175,.75]]
    : area.id === "maullin" ? [[140,90,.9],[315,90,.7],[420,145,.8],[250,180,.65]] : [[95,125,.75],[235,80,.85],[390,115,.7],[480,75,.75],[330,175,.6]];
  const birds = groups.map(([x,y,s]) => `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="#143d3d" stroke-width="5" stroke-linecap="round"><path d="M0 10c14-13 29-13 44 0 15-13 30-13 45 0"/></g>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="560" viewBox="0 0 900 560"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#bcd7d5"/><stop offset="1" stop-color="#f2edcf"/></linearGradient><linearGradient id="w" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#3b7476"/><stop offset="1" stop-color="#77a79d"/></linearGradient></defs><rect width="900" height="560" fill="url(#s)"/><circle cx="730" cy="105" r="48" fill="#f1cf72"/><path d="M0 310C140 250 260 292 390 310s300-25 510-10v260H0Z" fill="#6f8f6c"/><path d="M0 375c180-55 330 1 500 5 130 3 250-35 400-45v225H0Z" fill="url(#w)"/><path d="M0 458c170-30 330 10 500 0s260-38 400-40v142H0Z" fill="#28595d" opacity=".78"/>${birds}<g fill="#efe8c8"><circle cx="160" cy="405" r="6"/><circle cx="185" cy="412" r="6"/><circle cx="214" cy="397" r="6"/><circle cx="246" cy="416" r="6"/><circle cx="295" cy="405" r="6"/><circle cx="540" cy="395" r="7"/><circle cx="575" cy="410" r="7"/><circle cx="610" cy="394" r="7"/></g><text x="28" y="38" font-family="Arial" font-size="17" font-weight="700" fill="#123d3e">MIGRAVES · ${escapeXml(area.code)} · SIMULACIÓN</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function loadDemo(areaId = state.selectedArea) {
  if (!areas[areaId]) areaId = "chamiza";
  selectArea(areaId);
  setImage(demoSvg(areas[areaId]), `demo-${areaId}.svg`, "simulated");
  state.mode = "demo";
  showToast(state.language === "es" ? `Simulación de ${areas[areaId].code} cargada. Todos los datos están etiquetados.` : `${areas[areaId].code} simulation loaded. All data is labeled.`);
  $("#laboratorio").scrollIntoView({ behavior: "smooth", block: "start" });
}

function collectContext() {
  const area = areas[state.selectedArea];
  return {
    language: state.language,
    area: toAbmObject(area),
    observed_at: $("#observedAt").value,
    field_note: $("#fieldNote").value.trim(),
    microclimate: {
      temperature_c: numberValue("#temperature"),
      humidity_percent: numberValue("#humidity"),
      pressure_hpa: numberValue("#pressure"),
      wind_speed_kmh: numberValue("#windSpeed"),
      rainfall_24h_mm: numberValue("#rainfall"),
      uv_index: numberValue("#uvIndex"),
      soil_moisture_percent: numberValue("#soilMoisture"),
      water_level: $("#waterLevel").value
    },
    bioacoustic_metadata: {
      events_per_minute: numberValue("#acousticEvents"),
      dominant_group: $("#acousticGroup").value.trim(),
      note: "Sensor metadata only; no audio file was analyzed by this MVP."
    },
    data_provenance: {
      image: state.imageSource === "real" ? "user_uploaded_real" : "simulated_demo",
      microclimate: state.mode === "demo" ? "simulated_demo" : "user_entered_or_sensor_import",
      bioacoustic: state.mode === "demo" ? "simulated_demo_metadata" : "user_entered_sensor_metadata",
      baseline: "area_defined_baseline"
    }
  };
}

function numberValue(selector) {
  const value = Number($(selector).value);
  return Number.isFinite(value) ? value : null;
}

async function runAnalysis(event) {
  event.preventDefault();
  if (!state.imageDataUrl) return showToast(state.language === "es" ? "Carga una imagen o una simulación." : "Load an image or simulation.");
  const button = $("#runAnalysis");
  const original = button.textContent;
  button.disabled = true;
  button.textContent = state.language === "es" ? "Generando registro trazable…" : "Generating traceable record…";
  try {
    let result;
    if (state.imageSource === "simulated") {
      await wait(850);
      const area = areas[state.selectedArea] || areas.chamiza;
      result = area.demo ? structuredClone(area.demo) : createDerivedDemo(area);
      state.mode = "demo";
      state.model = "simulation";
    } else {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: state.imageDataUrl, context: collectContext() })
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Analysis failed");
      result = payload.result;
      state.mode = "ai";
      state.model = payload.model || "configured-openai-model";
    }
    state.result = normalizeResult(result);
    state.recordId = makeRecordId(areas[state.selectedArea].code);
    state.validation = createPendingValidation();
    renderResult(state.result);
    drawDetections(state.result.detections || []);
    $("#resultsSection").hidden = false;
    $("#resultsSection").scrollIntoView({ behavior: "smooth", block: "start" });
    saveRecord();
  } catch (error) {
    console.error(error);
    const missing = String(error.message).includes("OPENAI_API_KEY") || String(error.message).includes("not configured");
    showToast(missing ? (state.language === "es" ? "La API no está configurada. Usa la simulación." : "The API is not configured. Use the simulation.") : (state.language === "es" ? `No se completó el análisis: ${error.message}` : `Analysis failed: ${error.message}`));
  } finally {
    button.disabled = false;
    button.textContent = original;
  }
}

function createDerivedDemo(area) {
  const base = structuredClone(defaultAreas.chamiza.demo);
  const factor = area.id === "maullin" ? 0.72 : area.id === "chiloe" ? 0.84 : 0.66;
  const score = area.alert?.score ?? 48;
  base.observation_id = `OBS-${area.code.replace(/[^A-Z0-9]/g, "").slice(-8)}-DEMO`;
  base.estimated_total_birds = Math.round(base.estimated_total_birds * factor);
  base.anomaly_score = score;
  base.anomaly_level = score >= 70 ? "high" : score >= 45 ? "moderate" : "low";
  base.summary = {
    es: `El área ${area.code} presenta una señal demostrativa ${score >= 45 ? "moderada" : "baja"}. La lectura combina imagen, microclima y metadatos acústicos simulados; sirve para demostrar el proceso, no como observación científica real.`,
    en: `Area ${area.code} shows a ${score >= 45 ? "moderate" : "low"} demo signal. The reading combines simulated image, microclimate, and acoustic metadata; it demonstrates the process and is not a real scientific observation.`
  };
  base.historical_comparison.arrival_timing_delta_days = area.id === "chiloe" ? -4 : -1;
  base.historical_comparison.abundance_delta_percent = area.id === "chiloe" ? 8 : -6;
  base.historical_comparison.water_level_delta = area.readings?.water === "high" ? "+9% estimado" : "sin cambio";
  base.climate_response_index = {
    score,
    level: base.anomaly_level,
    confidence: 0.67,
    components: { phenology: Math.min(100, score + 4), abundance: Math.max(10, score - 8), habitat: Math.min(100, score + 7), weather: Math.max(10, score - 3) },
    interpretation: { es: "Índice experimental calculado con datos de demostración.", en: "Experimental index calculated from demonstration data." }
  };
  base.detections = base.detections.map((item) => ({ ...item, estimated_count: Math.max(1, Math.round(item.estimated_count * factor)) }));
  return base;
}

function normalizeResult(result) {
  const normalized = structuredClone(result || {});
  normalized.climate_response_index ||= deriveIrbc(normalized);
  normalized.limitations ||= { es: ["Resultado pendiente de revisión humana."], en: ["Result pending human review."] };
  normalized.detections ||= [];
  normalized.environmental_signals ||= [];
  normalized.historical_comparison ||= { baseline_available: false, arrival_timing_delta_days: null, abundance_delta_percent: null, water_level_delta: "N/D", interpretation: "" };
  return normalized;
}

function deriveIrbc(result) {
  const comparison = result.historical_comparison || {};
  const phenology = comparison.arrival_timing_delta_days == null ? 0 : clamp(Math.abs(comparison.arrival_timing_delta_days) / 14 * 100);
  const abundance = comparison.abundance_delta_percent == null ? 0 : clamp(Math.abs(comparison.abundance_delta_percent) / 50 * 100);
  const habitat = clamp((result.anomaly_score || 0) * 0.95);
  const weather = clamp((result.anomaly_score || 0) * 0.85);
  const score = Math.round(phenology * 0.30 + abundance * 0.25 + habitat * 0.25 + weather * 0.20);
  return {
    score,
    level: score >= 70 ? "high" : score >= 40 ? "moderate" : "low",
    confidence: Math.max(0.35, Math.min(0.85, result.overall_confidence || 0.5)),
    components: { phenology: Math.round(phenology), abundance: Math.round(abundance), habitat: Math.round(habitat), weather: Math.round(weather) },
    interpretation: { es: "IRBC experimental derivado de las anomalías informadas. Requiere una línea base cuantitativa y validación estadística.", en: "Experimental BCRI derived from reported anomalies. It requires a quantitative baseline and statistical validation." }
  };
}

function renderResult(result) {
  const area = areas[state.selectedArea];
  const irbc = result.climate_response_index || deriveIrbc(result);
  const quality = qualityInfo();
  $("#resultTitle").textContent = `${area.name} · ${state.recordId || "RBM"}`;
  $("#metricRecordId").textContent = state.recordId || "—";
  $("#metricBirds").textContent = formatNumber(result.estimated_total_birds);
  $("#metricConfidence").textContent = `${Math.round((result.overall_confidence || 0) * 100)}%`;
  $("#metricIrbc").textContent = `${irbc.score ?? 0}/100`;
  $("#metricIrbcLevel").textContent = irbcLabel(irbc.level);
  $("#metricQuality").textContent = quality.code;
  $("#metricQualityText").textContent = quality.label;
  $("#resultSummary").textContent = localText(result.summary);
  $("#signalList").innerHTML = localTextArray(result.environmental_signals).map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  renderIrbc(irbc);

  const comparison = result.historical_comparison || {};
  $("#deltaArrival").textContent = comparison.arrival_timing_delta_days == null ? "N/D" : `${comparison.arrival_timing_delta_days > 0 ? "+" : ""}${comparison.arrival_timing_delta_days} ${state.language === "es" ? "días" : "days"}`;
  $("#deltaAbundance").textContent = comparison.abundance_delta_percent == null ? "N/D" : `${comparison.abundance_delta_percent > 0 ? "+" : ""}${comparison.abundance_delta_percent}%`;
  $("#deltaWater").textContent = comparison.water_level_delta || "N/D";
  $("#comparisonInterpretation").textContent = localText(comparison.interpretation);
  $("#recommendedAction").textContent = localText(result.recommended_action);
  $("#limitationsList").innerHTML = localTextArray(result.limitations).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  $("#detectionsBody").innerHTML = (result.detections || []).map((item) => `<tr><td>${escapeHtml(item.label)}</td><td>${formatNumber(item.estimated_count)}</td><td>${escapeHtml(item.behavior)}</td><td>${Math.round((item.confidence || 0) * 100)}%</td></tr>`).join("") || `<tr><td colspan="4">${state.language === "es" ? "Sin detecciones informadas" : "No detections reported"}</td></tr>`;
  $("#resultProvenance").innerHTML = `
    <span class="source-badge ${state.imageSource === "real" ? "real" : "simulated"}">${state.imageSource === "real" ? (state.language === "es" ? "IMAGEN REAL" : "REAL IMAGE") : (state.language === "es" ? "IMAGEN SIMULADA" : "SIMULATED IMAGE")}</span>
    <span class="source-badge ${state.mode === "demo" ? "simulated" : "real"}">${state.mode === "demo" ? (state.language === "es" ? "SENSORES SIMULADOS" : "SIMULATED SENSORS") : (state.language === "es" ? "SENSORES INGRESADOS" : "ENTERED SENSORS")}</span>
    <span class="source-badge estimated">${state.mode === "demo" ? (state.language === "es" ? "ESTIMACIÓN SIMULADA" : "SIMULATED ESTIMATE") : (state.language === "es" ? "ESTIMADO POR IA" : "AI ESTIMATED")}</span>
    ${state.validation.status !== "pending" ? `<span class="source-badge validated">${state.language === "es" ? "REVISADO POR PERSONA" : "HUMAN REVIEWED"}</span>` : ""}`;
  updateValidationUI();
  updateRecordPreview();
}

function renderIrbc(irbc) {
  const components = irbc.components || {};
  const fields = [["Phenology", "phenology"], ["Abundance", "abundance"], ["Habitat", "habitat"], ["Weather", "weather"]];
  fields.forEach(([id, key]) => {
    const value = clamp(components[key] || 0);
    $(`#component${id}`).textContent = `${Math.round(value)}/100`;
    $(`#bar${id}`).style.width = `${value}%`;
  });
  $("#irbcInterpretation").textContent = localText(irbc.interpretation);
}

function irbcLabel(level) {
  const map = { es: { low: "Bajo", moderate: "Moderado", high: "Alto", insufficient_data: "Datos insuficientes" }, en: { low: "Low", moderate: "Moderate", high: "High", insufficient_data: "Insufficient data" } };
  return map[state.language][level] || level || "—";
}

function drawDetections(detections) {
  const image = $("#imagePreview");
  if (!image.complete) return image.addEventListener("load", () => drawDetections(detections), { once: true });
  const canvas = $("#overlayCanvas");
  const rect = image.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.round(rect.width * dpr));
  canvas.height = Math.max(1, Math.round(rect.height * dpr));
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, rect.width, rect.height);
  const naturalRatio = image.naturalWidth / image.naturalHeight;
  const boxRatio = rect.width / rect.height;
  let drawWidth = rect.width, drawHeight = rect.height, offsetX = 0, offsetY = 0;
  if (naturalRatio > boxRatio) { drawHeight = rect.width / naturalRatio; offsetY = (rect.height - drawHeight) / 2; }
  else { drawWidth = rect.height * naturalRatio; offsetX = (rect.width - drawWidth) / 2; }
  detections.forEach((item, index) => {
    if (!Array.isArray(item.bbox) || item.bbox.length !== 4) return;
    const [x,y,w,h] = item.bbox;
    const bx = offsetX + drawWidth * x / 100;
    const by = offsetY + drawHeight * y / 100;
    const bw = drawWidth * w / 100;
    const bh = drawHeight * h / 100;
    ctx.strokeStyle = "#d9f49e";
    ctx.lineWidth = 2;
    ctx.strokeRect(bx, by, bw, bh);
    const label = `${index + 1} · ${item.label} · ${item.estimated_count}`;
    ctx.font = "600 12px DM Sans, sans-serif";
    const textWidth = Math.min(ctx.measureText(label).width + 14, rect.width - bx - 4);
    ctx.fillStyle = "rgba(8,47,50,.92)";
    ctx.fillRect(bx, Math.max(offsetY, by - 23), textWidth, 21);
    ctx.fillStyle = "#fff";
    ctx.fillText(label, bx + 7, Math.max(offsetY + 14, by - 8), Math.max(10, textWidth - 10));
  });
}

function clearCanvas() {
  const canvas = $("#overlayCanvas");
  const context = canvas?.getContext("2d");
  if (context) context.clearRect(0, 0, canvas.width, canvas.height);
}

function reviewerInfo() {
  return { name: $("#reviewerName").value.trim(), role: $("#reviewerRole").value };
}

function setValidation(status) {
  if (!state.result) return;
  const reviewer = reviewerInfo();
  if (!reviewer.name) return showToast(state.language === "es" ? "Ingresa el nombre del revisor o equipo." : "Enter the reviewer or team name.");
  if (status === "scientific_validated" && !["biologist", "scientist"].includes(reviewer.role)) {
    return showToast(state.language === "es" ? "El nivel N4 requiere rol de biólogo/a o científico/a." : "N4 requires a biologist or scientist role.");
  }
  if (status === "corrected") {
    $("#correctionPanel").hidden = false;
    $("#correctedTaxon").focus();
    return;
  }
  state.validation = { status, reviewer_name: reviewer.name, reviewer_role: reviewer.role, corrected_taxon: "", note: "", reviewed_at: new Date().toISOString() };
  $("#correctionPanel").hidden = true;
  updateValidationUI();
  updateRecordPreview();
  saveRecord();
}

function saveCorrection() {
  const reviewer = reviewerInfo();
  const taxon = $("#correctedTaxon").value.trim();
  const note = $("#reviewerNote").value.trim();
  if (!reviewer.name) return showToast(state.language === "es" ? "Ingresa el nombre del revisor." : "Enter the reviewer name.");
  if (!taxon) return showToast(state.language === "es" ? "Ingresa el taxón o grupo corregido." : "Enter the corrected taxon or group.");
  state.validation = { status: "corrected", reviewer_name: reviewer.name, reviewer_role: reviewer.role, corrected_taxon: taxon, note, reviewed_at: new Date().toISOString() };
  $("#correctionPanel").hidden = true;
  updateValidationUI();
  updateRecordPreview();
  saveRecord();
}

function qualityInfo() {
  const map = {
    pending: { code: "N2", es: "Estimación IA", en: "AI estimate" },
    confirmed: { code: "N3", es: "Revisión humana", en: "Human reviewed" },
    corrected: { code: "N3", es: "Corregido", en: "Corrected" },
    scientific_validated: { code: "N4", es: "Validación científica", en: "Scientific validation" },
    discarded: { code: "N0", es: "Descartado", en: "Discarded" }
  };
  const item = map[state.validation.status] || map.pending;
  return { code: item.code, label: item[state.language] };
}

function updateValidationUI() {
  const map = {
    es: { pending: "Pendiente de revisión", confirmed: "Confirmado por revisor", corrected: `Corregido: ${state.validation.corrected_taxon || "pendiente"}`, scientific_validated: "Validado científicamente (N4)", discarded: "Descartado por revisor" },
    en: { pending: "Awaiting review", confirmed: "Confirmed by reviewer", corrected: `Corrected: ${state.validation.corrected_taxon || "pending"}`, scientific_validated: "Scientifically validated (N4)", discarded: "Discarded by reviewer" }
  };
  $("#validationStatus").textContent = map[state.language][state.validation.status] || map[state.language].pending;
  const quality = qualityInfo();
  $("#metricQuality").textContent = quality.code;
  $("#metricQualityText").textContent = quality.label;
}

function buildRecord() {
  if (!state.result || !state.recordId) return null;
  const context = collectContext();
  const result = state.result;
  const quality = qualityInfo();
  const finalTaxon = state.validation.corrected_taxon || result.primary_taxon;
  return {
    schema: "MigrAves-RBM",
    schema_version: "1.0",
    record_id: state.recordId,
    generated_at: new Date().toISOString(),
    area: context.area,
    observation: {
      observed_at: context.observed_at,
      field_note: context.field_note,
      evidence: { image_filename: state.imageName, image_stored_in_export: false },
      estimated_total_birds: result.estimated_total_birds,
      visible_groups: result.visible_groups,
      primary_taxon: finalTaxon,
      overall_confidence: result.overall_confidence,
      species_or_groups: result.species_or_groups,
      observed_behaviors: result.observed_behaviors,
      detections: result.detections
    },
    environment: { microclimate: context.microclimate, bioacoustic_metadata: context.bioacoustic_metadata },
    historical_comparison: result.historical_comparison,
    climate_response_index: result.climate_response_index,
    interpretation: { summary: localText(result.summary), recommended_action: localText(result.recommended_action), limitations: localTextArray(result.limitations) },
    provenance: {
      ...context.data_provenance,
      source_classes: {
        simulated: state.mode === "demo",
        measured: state.mode !== "demo",
        imported: state.mode !== "demo",
        ai_estimated: state.mode === "ai",
        human_validated: state.validation.status !== "pending"
      },
      biological_analysis: state.mode === "demo" ? "simulated_estimate_pending_human_review" : "ai_estimate_pending_human_validation",
      analysis_mode: state.mode,
      ai_model: state.model || "unknown",
      software: "MigrAves Climate Sentinel MVP 0.4.0"
    },
    validation: { ...state.validation, data_quality_level: quality.code, data_quality_label: quality.label }
  };
}

function updateRecordPreview() {
  const record = buildRecord();
  if (!record) return;
  $("#recordPreview").textContent = JSON.stringify(record, null, 2);
}

function saveRecord() {
  const record = buildRecord();
  if (!record) return;
  const current = readRecords();
  const filtered = current.filter((item) => item.record_id !== record.record_id);
  filtered.unshift(record);
  localStorage.setItem(STORAGE_RECORDS, JSON.stringify(filtered.slice(0, 30)));
  renderRegistry();
}

function readRecords() {
  try { return JSON.parse(localStorage.getItem(STORAGE_RECORDS) || "[]"); }
  catch { return []; }
}

function renderRegistry() {
  const records = readRecords();
  $("#consoleRecordCount").textContent = records.length;
  $("#registryBody").innerHTML = records.map((record) => `<tr><td>${escapeHtml(record.record_id)}</td><td>${escapeHtml(record.area?.area_id || "—")}</td><td>${escapeHtml(formatDate(record.observation?.observed_at))}</td><td>${record.climate_response_index?.score ?? "—"}/100</td><td>${escapeHtml(record.validation?.data_quality_level || "N2")}</td><td>${escapeHtml(validationLabel(record.validation?.status))}</td></tr>`).join("") || `<tr><td colspan="6">${state.language === "es" ? "Aún no hay registros guardados." : "No records saved yet."}</td></tr>`;
}

function validationLabel(status) {
  const map = { es: { pending: "Pendiente", confirmed: "Confirmado", corrected: "Corregido", scientific_validated: "Validado N4", discarded: "Descartado" }, en: { pending: "Pending", confirmed: "Confirmed", corrected: "Corrected", scientific_validated: "N4 validated", discarded: "Discarded" } };
  return map[state.language][status] || status || "—";
}

function clearRegistry() {
  if (!confirm(state.language === "es" ? "¿Eliminar los registros guardados en este navegador?" : "Delete records stored in this browser?")) return;
  localStorage.removeItem(STORAGE_RECORDS);
  renderRegistry();
  showToast(state.language === "es" ? "Registro local eliminado." : "Local registry cleared.");
}

function exportCsv() {
  const record = buildRecord();
  if (!record) return;
  const c = record.historical_comparison || {};
  const irbc = record.climate_response_index || {};
  const row = {
    record_id: record.record_id,
    area_id: record.area.area_id,
    area_name: record.area.name,
    ecosystem_type: record.area.ecosystem_type,
    latitude: record.area.geometry.coordinates[1],
    longitude: record.area.geometry.coordinates[0],
    observed_at: record.observation.observed_at,
    primary_taxon: record.observation.primary_taxon,
    estimated_total_birds: record.observation.estimated_total_birds,
    overall_confidence: state.result.overall_confidence,
    temperature_c: record.environment.microclimate.temperature_c,
    humidity_percent: record.environment.microclimate.humidity_percent,
    pressure_hpa: record.environment.microclimate.pressure_hpa,
    wind_speed_kmh: record.environment.microclimate.wind_speed_kmh,
    rainfall_24h_mm: record.environment.microclimate.rainfall_24h_mm,
    water_level: record.environment.microclimate.water_level,
    acoustic_events_per_minute: record.environment.bioacoustic_metadata.events_per_minute,
    arrival_timing_delta_days: c.arrival_timing_delta_days,
    abundance_delta_percent: c.abundance_delta_percent,
    irbc_score: irbc.score,
    irbc_level: irbc.level,
    irbc_confidence: irbc.confidence,
    data_quality_level: record.validation.data_quality_level,
    validation_status: record.validation.status,
    reviewer_name: record.validation.reviewer_name,
    reviewer_role: record.validation.reviewer_role,
    summary: record.interpretation.summary
  };
  const headers = Object.keys(row);
  const csv = `${headers.join(",")}\n${headers.map((key) => csvCell(row[key] ?? "")).join(",")}`;
  downloadBlob(csv, `${record.record_id.toLowerCase()}.csv`, "text/csv;charset=utf-8");
}

function exportJson() {
  const record = buildRecord();
  if (!record) return;
  downloadBlob(JSON.stringify(record, null, 2), `${record.record_id.toLowerCase()}.json`, "application/json");
}

function exportGeoJson() {
  const record = buildRecord();
  if (!record) return;
  const coordinates = publicCoordinates(record.area);
  const geojson = {
    type: "Feature",
    geometry: { type: "Point", coordinates },
    properties: {
      record_id: record.record_id,
      area_id: record.area.area_id,
      observed_at: record.observation.observed_at,
      primary_taxon: record.observation.primary_taxon,
      estimated_total_birds: record.observation.estimated_total_birds,
      irbc_score: record.climate_response_index?.score,
      irbc_level: record.climate_response_index?.level,
      validation_status: record.validation.status,
      data_quality_level: record.validation.data_quality_level,
      coordinate_precision: record.area.governance.data_access === "open" ? "exact_demo_value" : "generalized_for_access_control"
    }
  };
  downloadBlob(JSON.stringify(geojson, null, 2), `${record.record_id.toLowerCase()}.geojson`, "application/geo+json");
}

function buildCsv(record = buildRecord()) {
  const row = {
    record_id: record.record_id, area_code: record.area.area_id, area_name: record.area.name,
    observed_at: record.observation.observed_at, primary_taxon: record.observation.primary_taxon,
    estimated_total_birds: record.observation.estimated_total_birds,
    irbc_score: record.climate_response_index.score, data_quality_level: record.validation.data_quality_level,
    validation_status: record.validation.status, simulated: record.provenance.source_classes.simulated,
    measured: record.provenance.source_classes.measured, imported: record.provenance.source_classes.imported,
    ai_estimated: record.provenance.source_classes.ai_estimated, human_validated: record.provenance.source_classes.human_validated
  };
  return `${Object.keys(row).map(csvCell).join(",")}\n${Object.values(row).map(csvCell).join(",")}\n`;
}

function buildGeoJson(record = buildRecord()) {
  return { type: "FeatureCollection", features: [{ type: "Feature", geometry: { type: "Point", coordinates: publicCoordinates(record.area) }, properties: { record_id: record.record_id, area_name: record.area.name, area_code: record.area.area_id, irbc_score: record.climate_response_index.score, validation_status: record.validation.status, data_quality_level: record.validation.data_quality_level, provenance: record.provenance.source_classes } }] };
}

function downloadResearchPackage() {
  if (!state.result) return showToast(state.language === "es" ? "Primero genera un RBM e IRBC." : "Generate an MBR and BCRI first.");
  const record = buildRecord();
  const base = `${record.record_id.toLowerCase()}-research-package`;
  const archive = createZip([
    { name: `${record.record_id.toLowerCase()}.json`, content: JSON.stringify(record, null, 2) },
    { name: `${record.record_id.toLowerCase()}.csv`, content: buildCsv(record) },
    { name: `${record.record_id.toLowerCase()}.geojson`, content: JSON.stringify(buildGeoJson(record), null, 2) }
  ]);
  downloadBlob(archive, `${base}.zip`, "application/zip", true);
  showToast(state.language === "es" ? "Paquete ZIP descargado: JSON, CSV y GeoJSON." : "ZIP package downloaded: JSON, CSV, and GeoJSON.");
}

function createZip(files) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  for (const file of files) {
    const name = encoder.encode(file.name);
    const data = encoder.encode(file.content);
    const checksum = crc32(data);
    const local = new Uint8Array(30 + name.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true); lv.setUint16(4, 20, true); lv.setUint16(6, 0x0800, true);
    lv.setUint32(14, checksum, true); lv.setUint32(18, data.length, true); lv.setUint32(22, data.length, true);
    lv.setUint16(26, name.length, true); local.set(name, 30);
    localParts.push(local, data);

    const central = new Uint8Array(46 + name.length);
    const cv = new DataView(central.buffer);
    cv.setUint32(0, 0x02014b50, true); cv.setUint16(4, 20, true); cv.setUint16(6, 20, true); cv.setUint16(8, 0x0800, true);
    cv.setUint32(16, checksum, true); cv.setUint32(20, data.length, true); cv.setUint32(24, data.length, true);
    cv.setUint16(28, name.length, true); cv.setUint32(42, offset, true); central.set(name, 46);
    centralParts.push(central);
    offset += local.length + data.length;
  }
  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const end = new Uint8Array(22);
  const ev = new DataView(end.buffer);
  ev.setUint32(0, 0x06054b50, true); ev.setUint16(8, files.length, true); ev.setUint16(10, files.length, true);
  ev.setUint32(12, centralSize, true); ev.setUint32(16, offset, true);
  return new Blob([...localParts, ...centralParts, end], { type: "application/zip" });
}

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function publicCoordinates(area) {
  const [lon, lat] = area.geometry.coordinates;
  if (area.governance.data_access === "sensitive") return [round(lon, 1), round(lat, 1)];
  if (area.governance.data_access === "restricted") return [round(lon, 2), round(lat, 2)];
  return [lon, lat];
}

function downloadBlob(content, filename, type, quiet = false) {
  const blob = content instanceof Blob ? content : new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  if (!quiet) showToast(state.language === "es" ? "Archivo exportado." : "File exported.");
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3300);
}

function makeRecordId(areaCode) {
  const date = new Date();
  const stamp = date.toISOString().replace(/[-:T]/g, "").slice(0, 12);
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RBM-${areaCode.replace(/^ABM-/, "")}-${stamp}-${suffix}`;
}

function sanitizeCode(value) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9-]/g, "").replace(/-+/g, "-");
}
function slugify(value) { return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50) || `area-${Date.now()}`; }
function formatNumber(value) { return new Intl.NumberFormat(state.language === "es" ? "es-CL" : "en-US").format(Number(value) || 0); }
function formatDate(value) { if (!value) return "—"; const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat(state.language === "es" ? "es-CL" : "en-US", { dateStyle: "short", timeStyle: "short" }).format(date); }
function csvCell(value) { return `"${String(value).replaceAll('"', '""')}"`; }
function escapeHtml(value) { return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" }[char])); }
function escapeXml(value) { return String(value ?? "").replace(/[<>&'\"]/g, (char) => ({ "<":"&lt;", ">":"&gt;", "&":"&amp;", "'":"&apos;", '"':"&quot;" }[char])); }
function wait(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
function clamp(value) { return Math.max(0, Math.min(100, Number(value) || 0)); }
function round(value, decimals) { const factor = 10 ** decimals; return Math.round(value * factor) / factor; }
function shortText(value, max) { const text = String(value); return text.length > max ? `${text.slice(0, max - 1)}…` : text; }

$("#languageToggle").addEventListener("click", () => { state.language = state.language === "es" ? "en" : "es"; applyLanguage(); });
$("#areaForm").addEventListener("submit", createArea);
$("#resetAreaForm").addEventListener("click", resetAreaForm);
["input", "change"].forEach((eventName) => $("#areaForm").addEventListener(eventName, () => updateAreaPreview()));
$("#exportAreaJson").addEventListener("click", exportSelectedArea);
$("#areaSelect").addEventListener("change", (event) => selectArea(event.target.value));
$("#browseButton").addEventListener("click", (event) => { event.stopPropagation(); $("#imageInput").click(); });
$("#dropZone").addEventListener("click", (event) => { if (!event.target.closest("button") && !state.imageDataUrl) $("#imageInput").click(); });
$("#dropZone").addEventListener("keydown", (event) => { if ((event.key === "Enter" || event.key === " ") && !state.imageDataUrl) $("#imageInput").click(); });
$("#imageInput").addEventListener("change", (event) => handleFile(event.target.files[0]));
$("#removeImage").addEventListener("click", (event) => { event.stopPropagation(); resetImage(); });
["dragenter", "dragover"].forEach((type) => $("#dropZone").addEventListener(type, (event) => { event.preventDefault(); $("#dropZone").classList.add("dragover"); }));
["dragleave", "drop"].forEach((type) => $("#dropZone").addEventListener(type, (event) => { event.preventDefault(); $("#dropZone").classList.remove("dragover"); }));
$("#dropZone").addEventListener("drop", (event) => handleFile(event.dataTransfer.files[0]));
$("#loadDemo").addEventListener("click", () => loadDemo());
$("#loadDemoHero").addEventListener("click", () => { loadDemo("chamiza"); setTimeout(() => $("#analysisForm").requestSubmit(), 450); });
$("#analysisForm").addEventListener("submit", runAnalysis);
$$(".validate").forEach((button) => button.addEventListener("click", () => setValidation(button.dataset.status)));
$("#saveCorrection").addEventListener("click", saveCorrection);
$("#exportCsv").addEventListener("click", exportCsv);
$("#exportJson").addEventListener("click", exportJson);
$("#exportGeoJson").addEventListener("click", exportGeoJson);
$("#downloadResearchPackage").addEventListener("click", downloadResearchPackage);
$("#clearRegistry").addEventListener("click", clearRegistry);
$("#newAnalysis").addEventListener("click", () => { $("#resultsSection").hidden = true; state.result = null; state.recordId = null; state.model = null; state.validation = createPendingValidation(); clearCanvas(); $("#laboratorio").scrollIntoView({ behavior: "smooth", block: "start" }); });
window.addEventListener("resize", () => { if (state.result) drawDetections(state.result.detections || []); });

setDefaultDate();
renderAreaCards();
populateAreaSelect();
selectArea("chamiza");
renderRegistry();
applyLanguage();
