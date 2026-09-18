import type { EvidenceClass } from '../../sources/types.js';

export type LessonId = 'acceptance' | 'discernment' | 'responsibility' | 'compassion';
export type ResponseId = 'accept' | 'control' | 'defer';
export interface IncarnationProgram {
  sourceClassification: 'SIMULATION_ABSTRACTION';
  lessonFocus: LessonId;
  predisposition: 'sensitivity' | 'steadiness' | 'curiosity';
  limitation: 'uncertainty' | 'limited-support' | 'finite-energy';
  relationship: 'family' | 'friendship' | 'community';
  catalystOpportunity: 'rejection' | 'responsibility' | 'power' | 'compassion';
  environment: 'changing' | 'sheltered' | 'interdependent';
  priority: 'connection' | 'self-knowledge' | 'service';
}
export type ProgramField = Exclude<keyof IncarnationProgram, 'sourceClassification'>;
export interface ProgramFieldDefinition {
  key: ProgramField;
  label: string;
  conceptId: 'incarnation_program' | 'program_conditions';
  sourceClassification: EvidenceClass;
  options: readonly { value: string; label: string }[];
}
export const programFields: readonly ProgramFieldDefinition[] = [
  { key: 'lessonFocus', label: 'Lesson focus', conceptId: 'incarnation_program', sourceClassification: 'SIMULATION_ABSTRACTION', options: [{ value: 'acceptance', label: 'Acceptance' }, { value: 'discernment', label: 'Discernment' }, { value: 'responsibility', label: 'Responsibility' }, { value: 'compassion', label: 'Compassion' }] },
  { key: 'predisposition', label: 'Predisposition', conceptId: 'incarnation_program', sourceClassification: 'SIMULATION_ABSTRACTION', options: [{ value: 'sensitivity', label: 'Strong sensitivity' }, { value: 'steadiness', label: 'Steadiness' }, { value: 'curiosity', label: 'Curiosity' }] },
  { key: 'limitation', label: 'Limitation', conceptId: 'incarnation_program', sourceClassification: 'SIMULATION_ABSTRACTION', options: [{ value: 'uncertainty', label: 'Uncertainty' }, { value: 'limited-support', label: 'Limited social support' }, { value: 'finite-energy', label: 'Finite energy' }] },
  { key: 'relationship', label: 'Relationship context', conceptId: 'program_conditions', sourceClassification: 'SIMULATION_ABSTRACTION', options: [{ value: 'family', label: 'Family / belonging' }, { value: 'friendship', label: 'Friendship / trust' }, { value: 'community', label: 'Community / responsibility' }] },
  { key: 'catalystOpportunity', label: 'Potential catalyst', conceptId: 'program_conditions', sourceClassification: 'SIMULATION_ABSTRACTION', options: [{ value: 'rejection', label: 'Rejection' }, { value: 'responsibility', label: 'Responsibility' }, { value: 'power', label: 'Power' }, { value: 'compassion', label: 'Compassion' }] },
  { key: 'environment', label: 'Environment', conceptId: 'program_conditions', sourceClassification: 'SIMULATION_ABSTRACTION', options: [{ value: 'changing', label: 'Changing circumstances' }, { value: 'sheltered', label: 'Sheltered surroundings' }, { value: 'interdependent', label: 'Interdependent community' }] },
  { key: 'priority', label: 'Incarnative priority', conceptId: 'program_conditions', sourceClassification: 'SIMULATION_ABSTRACTION', options: [{ value: 'connection', label: 'Connection' }, { value: 'self-knowledge', label: 'Self-knowledge' }, { value: 'service', label: 'Service' }] },
];
export const defaultProgram: IncarnationProgram = {
  sourceClassification: 'SIMULATION_ABSTRACTION', lessonFocus: 'acceptance', predisposition: 'sensitivity',
  limitation: 'uncertainty', relationship: 'friendship', catalystOpportunity: 'rejection', environment: 'changing', priority: 'connection',
};
