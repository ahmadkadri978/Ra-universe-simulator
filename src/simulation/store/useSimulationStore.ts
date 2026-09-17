import { create } from 'zustand';
import { createInitialSimulationState } from '../state/initialState.js';
import { simulationReducer } from '../engine/reducer.js';
import type { SimulationEvent } from '../events/types.js';
import type { SimulationState } from '../state/types.js';

interface SimulationStore {
  state: SimulationState;
  dispatch: (event: SimulationEvent) => void;
}

export const useSimulationStore = create<SimulationStore>((set) => ({
  state: createInitialSimulationState(),
  dispatch: (event) =>
    set((current) => ({
      state: simulationReducer(current.state, event),
    })),
}));
