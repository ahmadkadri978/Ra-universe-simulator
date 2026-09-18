import type { SimulationState } from '../state/types.js';
import type { LifeEvent } from '../../domain/incarnation/events.js';

export function visibleLifeEvents(state: SimulationState): LifeEvent[] {
  if (state.timeSpace.perspective === 'INCARNATE_SELF' && state.incarnation.phase === 'INCARNATE') return state.incarnation.events.slice(-3);
  if (state.timeSpace.perspective === 'TOTALITY') return [...state.incarnation.archive.flatMap((life) => life.events), ...state.incarnation.events];
  return state.incarnation.events;
}
export function selectedLifeEvent(state: SimulationState): LifeEvent | undefined {
  return [...state.incarnation.events, ...state.incarnation.archive.flatMap((life) => life.events)].find((event) => event.id === state.timeSpace.selectedEventId);
}
export const canRespond = (state: SimulationState): boolean => state.incarnation.phase === 'INCARNATE' && state.timeSpace.perspective === 'INCARNATE_SELF' && state.incarnation.pendingCatalyst !== null;
