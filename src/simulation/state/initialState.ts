import { createDefaultEnergyCenters } from '../../domain/energyCenters/energyCenters.js';
import type { SimulationState } from './types.js';
import { createIncarnation } from '../incarnation/programming.js';
import { createPossibilityGraph } from '../possibility/engine.js';

export const createInitialSimulationState = (seed = 19810115): SimulationState => ({
  seed,
  clock: {
    tick: 0,
    paused: true,
    speed: 1,
  },
  selectedConceptId: 'intelligent_infinity',
  entity: {
    id: 'entity-primary',
    name: 'Primary Entity',
    currentDensity: 3,
    veilActive: true,
    polarity: {
      serviceToOthers: 0.46,
      serviceToSelf: 0.22,
      orientation: 'UNPOLARIZED',
    },
    energyCenters: createDefaultEnergyCenters(),
    catalystHistory: [],
    incarnationCount: 17,
    awareness: 0.48,
    compassion: 0.44,
    wisdom: 0.31,
  },
  incarnation: createIncarnation('entity-primary'),
  possibilities: createPossibilityGraph('entity-primary', 'entity-primary-life-1-open'),
  timeSpace: { entityId: 'entity-primary', incarnationId: 'entity-primary-life-1', reality: 'SPACE_TIME', perspective: 'INCARNATE_SELF', selectedEventId: null, selectedPossibilityId: null, sourceClassification: 'SIMULATION_ABSTRACTION' },
  lifeReview: null,
  higherSelf: {
    available: true,
    sourceClassification: 'SOURCE_BACKED',
    accumulatedLessonIds: [],
    guidance: null,
    programmedLessonIds: ['acceptance', 'responsibility', 'balanced-service'],
    probabilityBranches: [
      { id: 'branch-a', label: 'Acceptance / integration', weight: 0.36, open: true, source: 'SIMULATION_ABSTRACTION' },
      { id: 'branch-b', label: 'Control / separation', weight: 0.22, open: true, source: 'SIMULATION_ABSTRACTION' },
      { id: 'branch-c', label: 'Deferred choice', weight: 0.42, open: true, source: 'SIMULATION_ABSTRACTION' },
    ],
  },
  socialMemory: {
    memberCount: 64,
    coherence: 0.28,
    sharedMemoryAccess: 0.18,
    transparency: 0.23,
    individualityPreserved: true,
  },
});
