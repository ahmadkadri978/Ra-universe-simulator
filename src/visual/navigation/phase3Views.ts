import type { ConceptId } from '../../domain/ontology/types.js';
import type { Vec3Tuple } from './types.js';

export type Phase3View = 'timeline' | 'time-space' | 'higher-self' | 'possibility' | 'planning';
export interface Phase3ViewDefinition {
  id: Phase3View;
  label: string;
  title: string;
  description: string;
  conceptId: ConceptId;
  anchor: Vec3Tuple;
  cameraOffset: Vec3Tuple;
  sourceClassification: 'SIMULATION_ABSTRACTION';
}
export const phase3Views: readonly Phase3ViewDefinition[] = [
  { id: 'timeline', label: 'Space / Time', title: 'One life. An open response.', description: 'Experience unfolds in sequence. The next response belongs to the incarnate self.', conceptId: 'space_time', anchor: [3.2, 0, -106], cameraOffset: [0, 1.2, 12], sourceClassification: 'SIMULATION_ABSTRACTION' },
  { id: 'time-space', label: 'Time / Space', title: 'The same life, seen in relation.', description: 'A chronological path becomes a network of lessons, relationships, and responses.', conceptId: 'time_space', anchor: [3.2, 1.2, -123], cameraOffset: [0, 1.5, 12], sourceClassification: 'SIMULATION_ABSTRACTION' },
  { id: 'higher-self', label: 'Higher Self', title: 'A wider map. Your choices.', description: 'Patterns and accumulated lessons become visible. Assistance offers context without taking control.', conceptId: 'higher_self', anchor: [1.4, 1.8, -140], cameraOffset: [0, 1.7, 13], sourceClassification: 'SIMULATION_ABSTRACTION' },
  { id: 'possibility', label: 'Possibility field', title: 'More than one path remains.', description: 'Explore branches around the current decision. Their visual weights express emphasis, never a prediction.', conceptId: 'possibility_vortices', anchor: [3.2, 0.8, -157], cameraOffset: [0, 1.4, 13.5], sourceClassification: 'SIMULATION_ABSTRACTION' },
  { id: 'planning', label: 'Life programming', title: 'Conditions invite. You respond.', description: 'Compose a model incarnation. A lesson focus shapes opportunities while every response stays open.', conceptId: 'incarnation_program', anchor: [2, 0, -174], cameraOffset: [0, 1.3, 12.5], sourceClassification: 'SIMULATION_ABSTRACTION' },
];
export const getPhase3View = (id: Phase3View): Phase3ViewDefinition => phase3Views.find((view) => view.id === id)!;
