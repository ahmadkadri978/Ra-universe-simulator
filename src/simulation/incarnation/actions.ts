import type { ProgramField, ResponseId } from '../../domain/incarnation/program.js';
import type { PerspectiveMode, RealityMode } from '../../domain/timeSpace/types.js';

export type JourneyAction =
  | { type: 'PROGRAM'; field: ProgramField; value: string }
  | { type: 'ENTER' }
  | { type: 'VEIL' }
  | { type: 'CATALYST' }
  | { type: 'CHOOSE'; actor: 'ENTITY' | 'HIGHER_SELF' | 'TOTALITY'; response: ResponseId }
  | { type: 'DEATH' }
  | { type: 'REVIEW' }
  | { type: 'HEALING' }
  | { type: 'INTEGRATE'; eventId: string }
  | { type: 'NEXT_INCARNATION' }
  | { type: 'PERSPECTIVE'; perspective: PerspectiveMode }
  | { type: 'REALITY'; reality: RealityMode }
  | { type: 'INSPECT_EVENT'; eventId: string }
  | { type: 'INSPECT_POSSIBILITY'; possibilityId: string }
  | { type: 'GUIDANCE' };
