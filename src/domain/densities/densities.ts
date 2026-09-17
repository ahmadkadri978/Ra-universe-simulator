import type { DensityDefinition } from './types.js';

export const densities: readonly DensityDefinition[] = [
  { number: 1, name: 'Being', coreLesson: 'Elemental beingness and the earliest movement toward awareness.', visualIntent: 'Slow coherent field formation.', simulationCapabilities: ['elemental-state'] },
  { number: 2, name: 'Growth', coreLesson: 'Growth, movement, and biological awareness.', visualIntent: 'Organic branching and upward movement.', simulationCapabilities: ['growth', 'individuation'] },
  { number: 3, name: 'Choice', coreLesson: 'Self-awareness, veil, catalyst, and polarity.', visualIntent: 'High separation, branching choices, partial information.', simulationCapabilities: ['veil', 'catalyst', 'polarity', 'incarnation'] },
  { number: 4, name: 'Love / Understanding', coreLesson: 'Compassion and increasing collective transparency.', visualIntent: 'Network coherence without erasing nodes.', simulationCapabilities: ['social-memory', 'collective-transparency'] },
  { number: 5, name: 'Light / Wisdom', coreLesson: 'Wisdom and refinement of light.', visualIntent: 'Sparse, precise structures and reduced visual noise.', simulationCapabilities: ['wisdom', 'light-refinement'] },
  { number: 6, name: 'Unity', coreLesson: 'Integration of love and wisdom.', visualIntent: 'Multiple structures resolving into coherent fields.', simulationCapabilities: ['higher-self', 'polarity-integration'] },
  { number: 7, name: 'Foreverness', coreLesson: 'Approach toward totality and completion.', visualIntent: 'Identity boundaries becoming less dominant.', simulationCapabilities: ['totality', 'gateway'] },
  { number: 8, name: 'Octave Renewal', coreLesson: 'Completion of an octave and beginning of another.', visualIntent: 'Return to unity that also seeds a new structure.', simulationCapabilities: ['octave-transition'] },
] as const;
