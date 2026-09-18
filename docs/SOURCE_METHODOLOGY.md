# Source Methodology

The simulator uses a three-level evidence model.

## SOURCE_BACKED

The concept or rule is explicitly supported in *The Ra Contact / Law of One* material. A source record must contain one or more session/question references.

Examples in the current foundation include:
- First Distortion / Free Will
- Second Distortion / Love or Logos
- Light as the next primal distortion
- the seven energy centers
- Higher Self as a resource for healing and further programming
- probability/possibility vortices
- 51% Service to Others and 95% Service to Self harvest thresholds
- line-of-light / vibrational compatibility imagery for harvest
- social memory and a shared central thought complex

## INFERRED

A concept is not stated in exactly the implementation form used, but the simulator derives a relationship from multiple source-backed statements. Inference must remain reversible and documented.

Phase 3 uses this category for interpreted relationships between conditions and lesson focus, and for optional guidance based on recorded patterns. Presets and pattern-counting remain simulation abstractions.

## SIMULATION_ABSTRACTION

The implementation needs a numeric, geometric, temporal, or graphical representation that the source does not provide.

Examples:
- branch visual weights (never numerical probabilities)
- catalyst intensity values
- per-event polarity deltas
- coherence percentages
- node spacing
- 3D location of metaphysical concepts

These values exist to make the simulator interactive. They are never attributed to Ra.

## Source Record Contract

Each source record contains:
- stable id
- concept id
- title
- classification
- concise paraphrase
- session/question references
- optional implementation note explaining what the simulator adds

The source catalog is located at:

`src/sources/catalog.ts`

## Quotation Policy

The production app should prefer concise paraphrase plus session/question navigation. If direct quotations are later displayed, they must be short, source-linked, and handled consistently with the publication/copyright requirements of the source holder.

## Phase 3 anchors

| Reference | Supported concept | Added by the model |
| --- | --- | --- |
| [36.1–36.2](https://www.lawofone.info/s/36#1) | Totality as a resource; Higher Self assistance; possibility information | Lenses, layered ribbons, finite graph |
| [36.5–36.7](https://www.lawofone.info/s/36#5) | Future standpoint, accumulated lessons, map relationship, retained choice | Authority gate and optional guidance |
| [47.11–47.15](https://www.lawofone.info/s/47#11) | Indigo/form-maker activation, review and preparation | Camera transition and indigo marker |
| [21.9–21.10](https://www.lawofone.info/s/21#9) | Forgetting, review/healing, developing participation in conditions | Lifecycle stages and seven example fields |

These passages were checked against the session transcript. The interface uses short paraphrases and direct question links. Session 47 includes variations; the implemented sequence must not imply a fixed universal metaphysical schedule.

A concept may be SOURCE_BACKED while its geometry is SIMULATION_ABSTRACTION. The inspector shows the conceptual record and an implementation note. New visual groups carry abstraction metadata, and the Phase 3 interface exposes its spatial-model classification.

Planning examples are invented. They do not establish that any real person's adversity, relationships, limitations, or circumstances were preselected.
