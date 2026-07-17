# Scientific and governance guardrails

## Claims the system may make

- A visible or estimated number of birds was observed at a stated area and time.
- A tentative taxonomic or functional group was estimated with a stated confidence.
- Observable behavior classes were present in the image.
- Environmental variables coincided with the observation.
- The event differs from a supplied baseline by an estimated amount.
- The experimental IRBC has stated components, confidence, and limitations.
- Repeated comparable observation and specialist review are recommended.

## Claims the system must not make

- A single record proves climate change or climate causality.
- Bird behavior predicts tornadoes, earthquakes, or disasters.
- Coincidence between weather and bird response establishes cause.
- The system has inferred emotions, intentions, stress feelings, or moods.
- An acoustic taxon was identified when no audio was analyzed.
- A tentative visual label is a confirmed scientific occurrence record.
- N4 validation proves the record is error-free or suitable for every study.

## Data-quality workflow

- **N1:** raw sensor/imported data; planned production layer.
- **N2:** AI-estimated RBM pending human review.
- **N3:** named human reviewer confirmed or corrected the record.
- **N4:** named reviewer selected a biologist/scientist role and explicitly validated the record.
- **N0:** discarded record.

The MVP cannot verify professional credentials. Production requires authenticated institutional roles.

## Sensitive biodiversity data

- Exact coordinates should not be public by default for nests, threatened species, breeding colonies, or vulnerable roosts.
- Public exports should generalize or remove location fields according to area and species rules.
- Evidence access should be separated from summary-data access.
- Community transparency must be balanced with non-disturbance and anti-poaching safeguards.

## Pilot evaluation

- Compare automated counts with blinded expert counts.
- Report mean absolute error by flock-size range.
- Measure bird-presence precision and recall.
- Report agreement at functional-group, genus, and species resolution separately.
- Calibrate IRBC components against independent ecological and weather datasets.
- Track false alerts and reviewer rejection reasons.
- Measure inter-reviewer agreement.
- Keep training, threshold-tuning, and final evaluation periods separate.
- Publish missing-data and sensor-failure rates.
- Do not turn a correlation into a causal climate conclusion without an appropriate study design.
