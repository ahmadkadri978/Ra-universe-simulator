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

No major Phase 1 mechanics currently depend on this category; it is reserved for later work.

## SIMULATION_ABSTRACTION

The implementation needs a numeric, geometric, temporal, or graphical representation that the source does not provide.

Examples:
- branch probability weights
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
