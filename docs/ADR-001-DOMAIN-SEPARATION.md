# ADR-001: Separate Ontology, Simulation, Sources, and Rendering

**Status:** Accepted

## Context

The prototype accumulated ontology, state updates, rendering behavior, interface controls, and explanatory text in one large HTML file. That made experimentation fast but would make Higher Self, continuous zoom, catalyst branching, guided journeys, source intelligence, and audio increasingly fragile.

## Decision

Use a modular architecture with the following dependency rules:

- Domain knows nothing about React or Three.js.
- Simulation rules operate only on domain state.
- Source provenance is a separate database.
- Zustand adapts the pure reducer to React.
- React Three Fiber consumes state but does not define metaphysical rules.
- UI may dispatch typed events but may not mutate simulation structures directly.

## Consequences

Positive:
- mechanics can be unit tested without WebGL
- visual rewrites do not require rewriting ontology
- source corrections do not require editing shaders
- deterministic state enables replay and future guided journeys
- Unity or another renderer can later consume the same domain concepts

Cost:
- more files and explicit types
- some prototype shortcuts are intentionally removed
