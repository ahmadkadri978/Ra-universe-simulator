import type { EntityState } from '../../domain/entities/types.js';
import type { HigherSelfState } from '../../domain/higherSelf/types.js';
import type { IncarnationState } from '../../domain/incarnation/types.js';
import type { SocialMemoryState } from '../../domain/socialMemory/types.js';
import type { ConceptId } from '../../domain/ontology/types.js';
import type { PossibilityGraph } from '../../domain/possibility/types.js';
import type { LifeReview, TimeSpaceState } from '../../domain/timeSpace/types.js';

export interface SimulationClock {
  tick: number;
  paused: boolean;
  speed: number;
}

export interface SimulationState {
  seed: number;
  clock: SimulationClock;
  selectedConceptId: ConceptId | null;
  entity: EntityState;
  incarnation: IncarnationState;
  higherSelf: HigherSelfState;
  possibilities: PossibilityGraph;
  timeSpace: TimeSpaceState;
  lifeReview: LifeReview | null;
  socialMemory: SocialMemoryState;
}
