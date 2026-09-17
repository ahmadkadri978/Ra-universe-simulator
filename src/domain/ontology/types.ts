import type { EvidenceClass } from '../../sources/types.js';

export type ConceptId =
  | 'intelligent_infinity'
  | 'free_will'
  | 'logos_love'
  | 'light'
  | 'creation'
  | 'density'
  | 'mind_body_spirit_complex'
  | 'catalyst'
  | 'polarity'
  | 'harvest'
  | 'higher_self'
  | 'social_memory_complex'
  | 'space_time'
  | 'time_space';

export interface OntologyConcept {
  id: ConceptId;
  name: string;
  shortDescription: string;
  classification: EvidenceClass;
  parentIds: ConceptId[];
  childIds: ConceptId[];
  sourceRecordIds: string[];
}
