import type { ConceptId } from '../../domain/ontology/types.js';
import type { CatalystInput } from '../rules/catalyst.js';

export type SimulationEvent =
  | { type: 'CLOCK_TICK'; amount?: number }
  | { type: 'CLOCK_SET_PAUSED'; paused: boolean }
  | { type: 'CLOCK_SET_SPEED'; speed: number }
  | { type: 'SELECT_CONCEPT'; conceptId: ConceptId | null }
  | { type: 'APPLY_CATALYST'; catalyst: CatalystInput }
  | { type: 'SET_INCARNATION_PHASE'; phase: 'PLANNING' | 'INCARNATE' | 'DEATH_TRANSITION' | 'REVIEW' | 'HEALING' }
  | { type: 'RESET'; seed?: number };
