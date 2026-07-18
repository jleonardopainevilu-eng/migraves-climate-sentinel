# AGENTS.md

## Project intent

MigrAves Climate Sentinel is a Build Week research-support prototype. Preserve scientific caution, provenance, offline demonstration, accessibility, and dependency-free exports.

## Required guardrails

- The demonstration must work without `OPENAI_API_KEY` and must be visibly labeled as simulated.
- Never imply that one observation proves climate change or establishes climate causality.
- Never claim prediction of tornadoes, earthquakes, or other disasters.
- Keep simulated, measured, imported, AI-estimated, and human-validated provenance distinct.
- N4 requires a named reviewer with role `biologist` or `scientist`.
- Do not expose API keys in browser code.
- Do not add paid dependencies or services for the core demo or exports.

## Workflow

1. Work on a feature branch, never directly on `main`.
2. Run `npm run check` and `npm test` after changes.
3. Keep JSON, CSV, and GeoJSON exports functional in the browser.
4. Update tests and README when behavior or data contracts change.
5. Preserve bilingual Spanish/English UI strings where practical.
