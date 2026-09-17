import { create } from 'zustand';
import {
  backNavigationState,
  createInitialUniverseNavigationState,
  finishTravel,
  travelNavigationState,
} from './navigationLogic.js';
import type { UniverseNavigationState, UniverseScaleId } from './types.js';

interface UniverseNavigationStore extends UniverseNavigationState {
  travelTo: (scaleId: UniverseScaleId, selectedObjectId?: string | null) => void;
  back: () => void;
  finishTravel: () => void;
  reset: () => void;
  selectObject: (objectId: string | null) => void;
}

export const useUniverseNavigation = create<UniverseNavigationStore>((set) => ({
  ...createInitialUniverseNavigationState(),
  travelTo: (scaleId, selectedObjectId = null) =>
    set((state) => travelNavigationState(state, scaleId, selectedObjectId)),
  back: () => set((state) => backNavigationState(state)),
  finishTravel: () => set((state) => finishTravel(state)),
  reset: () => set(createInitialUniverseNavigationState()),
  selectObject: (selectedObjectId) => set({ selectedObjectId }),
}));
