import { create } from 'zustand';
import {
  backNavigationState,
  createInitialUniverseNavigationState,
  finishTravel,
  travelNavigationState,
  travelPhase3State,
  forwardNavigationState,
} from './navigationLogic.js';
import type { UniverseNavigationState, UniverseScaleId } from './types.js';
import type { Phase3View } from './phase3Views.js';
import type { PerspectiveMode } from '../../domain/timeSpace/types.js';

interface UniverseNavigationStore extends UniverseNavigationState {
  travelTo: (scaleId: UniverseScaleId, selectedObjectId?: string | null) => void;
  back: () => void;
  forward: () => void;
  enterPhase3: (view: Phase3View, selectedObjectId?: string | null) => void;
  finishTravel: () => void;
  reset: () => void;
  selectObject: (objectId: string | null) => void;
  setPerspective: (perspective: PerspectiveMode) => void;
}

export const useUniverseNavigation = create<UniverseNavigationStore>((set) => ({
  ...createInitialUniverseNavigationState(),
  travelTo: (scaleId, selectedObjectId = null) =>
    set((state) => travelNavigationState(state, scaleId, selectedObjectId)),
  back: () => set((state) => backNavigationState(state)),
  forward: () => set((state) => forwardNavigationState(state)),
  enterPhase3: (view, selectedObjectId = null) => set((state) => travelPhase3State(state, view, selectedObjectId)),
  finishTravel: () => set((state) => finishTravel(state)),
  reset: () => set(createInitialUniverseNavigationState()),
  selectObject: (selectedObjectId) => set({ selectedObjectId }),
  setPerspective: (perspective) => set({ perspective }),
}));
