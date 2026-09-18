import type { EvidenceClass } from '../../sources/types.js';
import type { LessonId, ResponseId } from '../incarnation/program.js';

export type PossibilityStatus = 'OPEN' | 'STRENGTHENED' | 'WEAKENED' | 'CLOSED' | 'EMERGENT';
export interface PossibilityNode {
  id: string;
  label: string;
  sourceClassification: EvidenceClass;
  visualWeight: number;
  status: PossibilityStatus;
  relatedLessons: LessonId[];
  relatedCatalyst: string[];
  energyCenterTendencies: string[];
  childPossibilities: string[];
  responseAffinity: ResponseId | null;
  parentId: string | null;
}
export interface PossibilityGraph {
  entityId: string;
  decisionId: string;
  revision: number;
  sourceClassification: 'SIMULATION_ABSTRACTION';
  nodes: PossibilityNode[];
}
