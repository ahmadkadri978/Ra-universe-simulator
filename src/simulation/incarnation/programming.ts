import { defaultProgram, programFields } from '../../domain/incarnation/program.js';
import type { IncarnationProgram, ProgramField } from '../../domain/incarnation/program.js';
import type { IncarnationState } from '../../domain/incarnation/types.js';

export function updateProgram(program: IncarnationProgram, field: ProgramField, value: string): IncarnationProgram {
  const definition = programFields.find((item) => item.key === field);
  if (!definition?.options.some((option) => option.value === value)) return program;
  return { ...program, [field]: value };
}
export function createIncarnation(entityId: string, cycle = 1, program: IncarnationProgram = { ...defaultProgram }): IncarnationState {
  return {
    id: `${entityId}-life-${cycle}`, entityId, cycle, phase: 'PLANNING', age: 0,
    sourceClassification: 'SIMULATION_ABSTRACTION', program: { ...program }, pendingCatalyst: null, events: [], archive: [],
    plan: { id: `plan-${cycle}`, lessons: [program.lessonFocus], limitations: [program.limitation], relationshipThemes: [program.relationship], catalystThemes: [program.catalystOpportunity] },
  };
}
