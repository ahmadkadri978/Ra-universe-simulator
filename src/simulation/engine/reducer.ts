import { applyCatalyst } from '../rules/catalyst.js';
import { createInitialSimulationState } from '../state/initialState.js';
import type { SimulationState } from '../state/types.js';
import type { SimulationEvent } from '../events/types.js';

export const simulationReducer = (
  state: SimulationState,
  event: SimulationEvent,
): SimulationState => {
  switch (event.type) {
    case 'CLOCK_TICK':
      if (state.clock.paused) return state;
      return {
        ...state,
        clock: {
          ...state.clock,
          tick: state.clock.tick + (event.amount ?? 1) * state.clock.speed,
        },
      };

    case 'CLOCK_SET_PAUSED':
      return { ...state, clock: { ...state.clock, paused: event.paused } };

    case 'CLOCK_SET_SPEED':
      return { ...state, clock: { ...state.clock, speed: Math.max(0.1, event.speed) } };

    case 'SELECT_CONCEPT':
      return { ...state, selectedConceptId: event.conceptId };

    case 'APPLY_CATALYST':
      return { ...state, entity: applyCatalyst(state.entity, event.catalyst) };

    case 'SET_INCARNATION_PHASE':
      return { ...state, incarnation: { ...state.incarnation, phase: event.phase } };

    case 'RESET':
      return createInitialSimulationState(event.seed ?? state.seed);

    default: {
      const exhaustive: never = event;
      return exhaustive;
    }
  }
};
