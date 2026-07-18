# MigrAves Climate Sentinel

MigrAves Climate Sentinel is an OpenAI Build Week research-support prototype. It converts migratory-bird observations and environmental variables into traceable **Registros Bioclimáticos Migratorios (RBM)** that can support future climate and ecological studies.

> **DEMONSTRATION — SIMULATED DATA.** The complete demo works without an `OPENAI_API_KEY`, paid APIs, or external data services.

## Problem and solution

Bird sightings, local ecological knowledge, images, and microclimate readings are often stored separately and with inconsistent metadata. MigrAves provides a reproducible territorial unit, explicit provenance, a cautious experimental indicator, human review, and dependency-free exports.

It does **not** claim that an isolated observation proves climate change or causality. It does not predict tornadoes, earthquakes, or other disasters. Reliable climate conclusions require repeated comparable sampling, calibrated instruments, statistical analysis, and expert review.

## ABM → RBM → IRBC flow

1. **ABM — Área Bioclimática Migratoria:** defines ecosystem, coordinates, priority taxa, baseline, governance, and access level.
2. **Observation:** uses a clearly labeled simulation or user-supplied evidence and environmental metadata.
3. **RBM — Registro Bioclimático Migratorio:** structures the observation, environment, history, uncertainty, and provenance.
4. **IRBC — Índice de Respuesta Biológica al Clima:** experimental 0–100 summary of phenology, abundance, habitat, and weather signals.
5. **Human validation:** confirm, correct, discard, or perform N4 scientific validation. N4 is restricted to a named `biologist` or `scientist`.
6. **Export:** download JSON, CSV, and GeoJSON individually or with **Download research package**.

## Architecture

```text
Browser UI (HTML/CSS/JS)
  ├─ localStorage: custom ABMs and RBMs
  ├─ local simulation: no key, no network, no paid service
  ├─ local exporters: JSON + CSV + GeoJSON
  └─ optional /api/analyze
       └─ OpenAI Responses API (server-side key only)
```

The core demonstration is static and browser-based. `api/analyze.js` is optional and only used for real uploaded-image analysis when a server-side key is configured.

## Provenance model

Every RBM keeps distinct flags and labels for:

- simulated data;
- measured values;
- imported values;
- AI-estimated results;
- human-reviewed or validated results.

Simulation never masquerades as field evidence. Restricted or sensitive ABMs receive generalized coordinates in GeoJSON exports.

## Implemented functions

- bilingual, mobile-first ABM creation and selection;
- full offline demonstration with a persistent simulation banner;
- RBM and experimental IRBC generation;
- full ABM name as the primary result heading, with RBM code secondary;
- human confirmation, correction, rejection, and N4 guardrail;
- local registry in the browser;
- individual JSON, CSV, and GeoJSON exports;
- one-click research package containing all three formats;
- accessible focus states, live status messages, responsive layouts, and conservative scientific language;
- optional structured GPT-5.6 image analysis through a serverless endpoint.

## Simulated data

The included areas and observations are synthetic demonstration fixtures. They exist to show the complete workflow and must not be treated as field measurements or scientific findings. The interface and exported provenance identify them explicitly.

## Try without an API key

Requirements: Node.js 20+.

```bash
npm install
npm run serve
```

Open the local URL, then:

1. create or select an ABM;
2. press **Ejecutar demostración**;
3. press **Generar RBM e IRBC**;
4. enter a reviewer name and choose a validation action;
5. press **Descargar paquete de investigación**.

No `.env` file or `OPENAI_API_KEY` is required for this path.

## Checks and tests

```bash
npm run check
npm test
```

The dependency-free smoke test covers ABM creation, demo RBM/IRBC generation, provenance, N4 allowed and blocked roles, CSV/JSON/GeoJSON package generation, and area naming.

## Optional OpenAI analysis

For real uploaded-image analysis, deploy the serverless endpoint and set `OPENAI_API_KEY`. `OPENAI_MODEL` is optional. The key is read only in `api/analyze.js` and is never sent to browser code.

GPT-5.6 is used conservatively to structure visual evidence, uncertainty, broad taxa, estimated counts, visible behavior, and comparisons supported by the supplied baseline. Codex was used to audit, implement, test, document, and prepare the Build Week branch.

## Future functions

- calibrated camera and acoustic-sensor ingestion;
- specialist edge models and automated quality checks;
- authenticated reviewer credentials and audit trails;
- PostGIS time series and research API;
- statistical calibration of IRBC across seasons and sites;
- interoperability with established biodiversity standards;
- field pilots with ecologists, communities, and conservation institutions.

## Main files

- `index.html`, `styles.css`, `app.js`: application UI and offline workflow.
- `api/analyze.js`: optional server-side multimodal analysis.
- `tests/smoke.mjs`: dependency-free workflow test.
- `data/`: ABM/RBM contracts and example record.
- `submission/`: Build Week and scientific-governance material.
- `AGENTS.md`: contributor and coding-agent guardrails.

## License

MIT. See `LICENSE`.
