import type { LessonId, ResponseId } from './program.js';

export interface CatalystEvent {
  id: string;
  label: string;
  description: string;
  lesson: LessonId;
  relationship: string;
  energyCenters: string[];
  sourceClassification: 'SIMULATION_ABSTRACTION';
}
export interface ChoiceEvent {
  id: string;
  catalystId: string;
  actor: 'ENTITY';
  response: ResponseId;
  sourceClassification: 'SIMULATION_ABSTRACTION';
}
export interface LifeEvent {
  id: string;
  incarnationId: string;
  entityId: string;
  sequence: number;
  kind: 'ENTRY' | 'CATALYST' | 'DEATH';
  label: string;
  catalyst: CatalystEvent | null;
  choice: ChoiceEvent | null;
  energyResponse: string;
  orientation: 'OPENNESS' | 'CONTROL' | 'UNRESOLVED' | 'NONE';
  sourceClassification: 'SIMULATION_ABSTRACTION';
}
