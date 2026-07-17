# MigrAves Climate Sentinel - competition draft

## Inspiration

Climate change is measured through physical systems such as weather stations, satellites, ocean sensors, and radar. Yet ecosystems also respond to changing temperature, rainfall, wind, water availability, and seasonal timing. Migratory birds connect distant regions and repeatedly use the same feeding and resting sites, making their timing, abundance, and habitat use a potentially valuable biological layer for long-term research.

The problem is not a lack of observations. The problem is that images, sensor readings, field notes, and expert corrections are often fragmented, delayed, or stored in incompatible formats.

We asked: can AI turn a local bird observation into a traceable, reviewable record that future scientists can actually reuse?

## What it does

MigrAves Climate Sentinel creates three connected data products:

1. **Migratory Bioclimatic Area (ABM/MBA):** a territorial unit with ecosystem type, coordinates, monitoring radius, priority species, historical baseline, responsible role, and access rules.
2. **Migratory Bioclimatic Record (RBM/MBR):** a standardized event record combining biological observation, microclimate, bioacoustic metadata, historical comparison, provenance, uncertainty, and validation.
3. **Biological Climate Response Index (IRBC/BCRI):** an experimental 0-100 indicator with separate phenology, abundance, habitat, and weather components.

A user can select one of three southern-Chile pilot areas or create a new area. They upload a wetland image or use a clearly labeled simulation, enter environmental readings, and run the analysis. GPT-5.6 produces strict structured output with tentative taxa, estimated counts, visible behavior, confidence, detection boxes, historical deltas, environmental signals, limitations, and recommended verification steps.

The application then generates a complete RBM, stores it locally, and exports CSV, JSON, or GeoJSON. Every result states whether the source was measured, imported, simulated, or AI-estimated.

## Human validation and education

AI does not replace the biologist. Students, technicians, community observers, biologists, and scientists can review each record.

Records move through explicit data-quality levels:

- N2: AI estimate awaiting review;
- N3: human-confirmed or corrected;
- N4: explicitly validated by a named biologist or scientist;
- N0: discarded.

This creates a practical learning loop: AI proposes, a person reviews, corrections remain traceable, and higher-quality records become more useful for future analysis.

## Why it is different

MigrAves is not only a bird classifier, weather dashboard, or GPS replacement.

GPS is strongest for reconstructing the trajectory of tagged individuals. MigrAves focuses on collective presence at strategic habitats and creates a common data language across areas.

Its core differentiation is the complete operational chain:

**create an ecological area -> observe -> compare with local history -> generate a standardized climate-response record -> expose uncertainty -> validate -> export for research.**

The prototype also treats biodiversity-data governance as part of the product. GeoJSON coordinates are generalized when an area is marked restricted or sensitive.

## How we built it

The MVP is a bilingual, mobile-first web application built with HTML, CSS, JavaScript, a Vercel serverless function, and the OpenAI Responses API.

GPT-5.6 receives image input plus a structured area and environmental context. Structured Outputs enforce a repeatable response schema. The frontend builds the final RBM, visualizes the IRBC components, overlays detections, manages reviewer states, stores up to 30 local records, and exports research-friendly formats.

Codex was used to define the product architecture, implement the area builder and record pipeline, create the schemas, add validation rules, test the application, document scientific boundaries, and prepare deployment and submission materials.

## Scientific guardrails

MigrAves does not claim that:

- one observation proves climate change;
- bird behavior predicts tornadoes, earthquakes, or other hazards;
- environmental coincidence establishes causality;
- a tentative image label is a confirmed taxonomic record;
- AI output replaces calibrated sampling or statistical attribution.

The IRBC is explicitly experimental. It is designed to organize signals and prioritize follow-up, not to function as an official climate index.

## What we are proud of

- An end-to-end ABM -> RBM -> IRBC workflow.
- A no-key simulation path for reliable judging.
- Secure image analysis through a serverless API.
- Strict structured multimodal output.
- Visible provenance and uncertainty.
- Four separate climate-response components.
- Named reviewer roles and data-quality levels.
- CSV, JSON, and GeoJSON exports.
- Coordinate generalization for sensitive areas.
- A local time-series registry.

## What's next

The next phase is a physical pilot in southern Chile using calibrated cameras, low-power acoustic triggers, weather and habitat sensors, edge processing, solar power, and intermittent connectivity.

Validated records would move to PostgreSQL/PostGIS and an API for approved research partners. Universities could use the review queue for field training, while local technicians maintain stations and communities receive accessible summaries without exposing sensitive biodiversity locations.

Success would be measured through expert count agreement, taxonomic agreement, IRBC calibration, reviewer agreement, false-alert rate, sensor uptime, energy use, and completeness of provenance.

## Built with

OpenAI GPT-5.6 Terra, OpenAI Responses API, Structured Outputs, Codex, JavaScript, HTML, CSS, Vercel, JSON Schema, CSV, and GeoJSON.
