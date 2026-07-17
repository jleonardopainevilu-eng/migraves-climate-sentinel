# Technical architecture

## Current MVP

```text
Mobile browser
  ├─ ABM area builder
  ├─ three pilot areas + custom areas
  ├─ image upload / labeled simulation
  ├─ microclimate and bioacoustic metadata
  ├─ visible provenance
  ├─ result visualization + bounding boxes
  ├─ IRBC component visualization
  ├─ human review and quality levels
  ├─ local 30-record registry
  └─ CSV / JSON / GeoJSON export
          ↓ POST /api/analyze
Vercel serverless function
  ├─ validates image and ABM context
  ├─ injects scientific constraints
  └─ calls OpenAI Responses API
          ↓
GPT-5.6 Terra
  └─ strict JSON Schema output
          ↓
Frontend record builder
  └─ final MigrAves-RBM 1.0 object
```

## Core data contracts

### ABM 1.0

- stable area identifier;
- ecosystem and region;
- point geometry and monitored radius;
- priority taxa;
- baseline period and description;
- responsible role;
- access classification.

### RBM 1.0

- stable record identifier;
- linked ABM;
- timestamp and evidence reference;
- estimated biological observation;
- environmental readings;
- historical deltas;
- experimental IRBC;
- provenance;
- interpretation and limitations;
- reviewer identity, role, status, and quality level.

## Future physical node

```text
Low-power microphone / specialist acoustic detector
  ↓ relevant trigger
Fixed camera + calibrated weather/habitat sensors
  ↓
Edge detector / tracker
  ├─ rejects empty frames
  ├─ estimates bird presence/count
  ├─ selects representative evidence
  └─ timestamps sensor packet
  ↓ store-and-forward connection
Central MigrAves platform
  ├─ GPT-5.6 evidence structuring
  ├─ baseline and IRBC service
  ├─ reviewer queue
  ├─ immutable audit log
  ├─ PostgreSQL/PostGIS time series
  └─ approved research API
```

## Recommended production components

- solar power, battery management, and weatherproof enclosure;
- fixed field of view and calibration markers;
- low-power compute capable of quantized specialist inference;
- temperature, humidity, pressure, wind, rainfall, and UV sensors;
- water-level and soil-moisture sensors where ecologically appropriate;
- specialist visual and acoustic models for primary detection;
- Supabase/PostgreSQL with PostGIS;
- object storage for evidence under retention rules;
- role-based access and sensitive-species coordinate controls;
- versioned models, sensor calibrations, and schemas;
- 4G, LoRa, or satellite store-and-forward connectivity.

## Security and privacy roadmap

- keep API credentials server-side;
- authenticated reviewer accounts;
- signed immutable validation history;
- encryption at rest and in transit;
- fine-grained area and species access rules;
- coordinate generalization in public outputs;
- evidence-retention and deletion policies;
- model and prompt version recorded with every RBM.
