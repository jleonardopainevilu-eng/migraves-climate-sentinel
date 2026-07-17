# MigrAves Climate Sentinel

MigrAves Climate Sentinel is a mobile-first research-support prototype that transforms bird observations, microclimate readings, bioacoustic metadata, and local historical baselines into traceable data products for future ecological and climate studies.

It is built around three explicit objects:

- **ABM - Area Bioclimática Migratoria:** a territorial monitoring unit with ecosystem, coordinates, priority species, baseline, governance, and data-access rules.
- **RBM - Registro Bioclimático Migratorio:** a standardized record containing biological observations, environmental readings, provenance, uncertainty, and validation status.
- **IRBC - Índice de Respuesta Biológica al Clima:** an experimental 0-100 indicator that separates phenology, abundance, habitat, and weather signals.

## Core proposition

Weather stations measure the atmosphere. MigrAves adds a biological layer that documents how migratory birds and their habitats appear to be responding.

The prototype does not claim that birds replace calibrated weather stations, satellites, radar, GPS tracking, ecological fieldwork, or statistical climate attribution.

## End-to-end MVP flow

1. Create or select an ABM.
2. Define ecosystem, location, monitoring radius, priority species, baseline, responsible role, and access level.
3. Upload a JPG, PNG, or WEBP image, or run a clearly labeled simulation.
4. Enter/import microclimate and bioacoustic sensor metadata.
5. GPT-5.6 analyzes visible evidence conservatively and returns structured output.
6. The application generates an RBM and experimental IRBC.
7. A student, technician, biologist, scientist, or community observer reviews the record.
8. The record moves through explicit quality levels.
9. Export CSV, JSON, or GeoJSON for later research workflows.

## Data quality levels

| Level | Meaning |
|---|---|
| N0 | Discarded record |
| N1 | Raw captured/imported data; future production layer |
| N2 | AI-estimated record pending human review |
| N3 | Human-confirmed or corrected record |
| N4 | Explicitly validated by a named biologist or scientist |

The UI does not allow N4 validation unless the reviewer role is `biologist` or `scientist` and a reviewer name is supplied. This is a workflow guardrail, not proof of credentials.

## Scientific boundaries

This prototype does **not**:

- prove climate change from one observation;
- establish climate causality;
- predict tornadoes, earthquakes, or other hazards;
- infer animal emotions or internal states;
- identify bird calls directly from audio;
- replace specialist taxonomic identification;
- replace calibrated ecological sampling or statistical analysis;
- publish sensitive coordinates without access controls.

The valid use is evidence structuring, early-warning triage, education, and creation of reviewable time-series records.

## OpenAI role

GPT-5.6 is used to:

- inspect uploaded visual evidence;
- estimate broad taxa, counts, visible groups, and observable behavior;
- compare the event with the supplied local baseline;
- separate phenology, abundance, habitat, and weather signals;
- generate strict structured output;
- expose uncertainty, limitations, and recommended next steps.

Codex is used to build, test, document, and refine the application.

## Local setup

Requirements: Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local
# Add OPENAI_API_KEY to .env.local
npm run dev
```

The full simulation works without an API key. Real image analysis requires the Vercel serverless function.

Run the local smoke test:

```bash
npm test
```

The test covers custom ABM creation, simulated RBM generation, IRBC output, and the N4 validation guard.

## Deploy to Vercel

1. Upload the project contents to a GitHub repository.
2. Import the repository into Vercel.
3. Add environment variables:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL` = `gpt-5.6-terra` (optional)
4. Redeploy.

The API key is only read by `api/analyze.js` and is never exposed to the browser.

## Main files

- `index.html` - bilingual mobile-first interface.
- `styles.css` - visual system and responsive layouts.
- `app.js` - ABM creation, demo network, RBM generation, IRBC, validation, local registry, and exports.
- `api/analyze.js` - secure multimodal Responses API call with strict JSON schema.
- `tests/smoke.mjs` - dependency-free workflow smoke test.
- `data/ABM_SCHEMA.json` - area data contract.
- `data/RBM_SCHEMA.json` - record data contract.
- `data/example-rbm.json` - example research record.
- `submission/PROJECT_DESCRIPTION_EN.md` - competition description.
- `submission/VIDEO_SCRIPT_ES.md` - short demo script.
- `submission/TECHNICAL_ARCHITECTURE.md` - current and future architecture.
- `submission/SCIENTIFIC_GUARDRAILS.md` - scientific and governance boundaries.

## Privacy and sensitive biodiversity data

Uploaded images are sent to OpenAI only when real AI analysis is requested. The prototype does not persist images on its server. Structured records and custom areas are stored locally in the browser.

GeoJSON exports generalize coordinates when an area is marked `restricted` or `sensitive`. A production system should implement authentication, role-based access, encryption, audit logs, and species-specific sensitivity rules.

## Future production architecture

```text
Low-power acoustic trigger
        ↓
Camera + calibrated sensors
        ↓
Specialist edge model filters/counts
        ↓
GPT-5.6 structures evidence and uncertainty
        ↓
Student/technician review
        ↓
Biologist/scientist validation
        ↓
Supabase/PostGIS time series + research API
```

## Pilot validation metrics

- bird-presence precision and recall;
- count error against expert manual counts;
- taxonomic agreement by resolution level;
- IRBC repeatability and calibration;
- false-alert rate;
- percentage of records confirmed, corrected, or discarded;
- reviewer agreement;
- sensor uptime and energy use;
- bytes transmitted per validated event;
- completeness of provenance fields.

## License

MIT. See `LICENSE`.
