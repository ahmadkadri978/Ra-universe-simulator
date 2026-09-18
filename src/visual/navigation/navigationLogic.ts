import { getScaleIndex, getScaleProgress, getUniverseScale } from './universeGraph.js';
import type { UniverseNavigationState, UniverseScaleId } from './types.js';
import type { Phase3View } from './phase3Views.js';

const context = (state: UniverseNavigationState) => ({ activeScaleId: state.activeScaleId, phase3View: state.phase3View, perspective: state.perspective, selectedObjectId: state.selectedObjectId, history: [...state.history], journeyProgress: state.journeyProgress });

export const createInitialUniverseNavigationState = (): UniverseNavigationState => ({
  activeScaleId: 'infinity',
  history: [],
  selectedObjectId: null,
  traveling: false,
  journeyProgress: 0,
  phase3View: null,
  perspective: 'INCARNATE_SELF',
  past: [],
  future: [],
});

export function canTravelDirectly(from: UniverseScaleId, to: UniverseScaleId): boolean {
  if (from === to) return true;
  const fromIndex = getScaleIndex(from);
  const toIndex = getScaleIndex(to);
  return Math.abs(fromIndex - toIndex) === 1 || toIndex < fromIndex;
}

export function travelNavigationState(
  state: UniverseNavigationState,
  to: UniverseScaleId,
  selectedObjectId: string | null = null,
): UniverseNavigationState {
  if (to === state.activeScaleId && !state.phase3View) {
    return { ...state, selectedObjectId };
  }

  const target = getUniverseScale(to);
  const currentIndex = getScaleIndex(state.activeScaleId);
  const targetIndex = target.index;
  const history = targetIndex > currentIndex
    ? [...state.history, state.activeScaleId]
    : state.history.filter((item) => getScaleIndex(item) < targetIndex);

  return {
    activeScaleId: to,
    history,
    selectedObjectId,
    traveling: true,
    journeyProgress: getScaleProgress(to),
    phase3View: null,
    perspective: state.perspective,
    past: [...state.past, context(state)],
    future: [],
  };
}

export function backNavigationState(state: UniverseNavigationState): UniverseNavigationState {
  const previous = state.past.at(-1);
  if (previous) return { ...previous, traveling: true, past: state.past.slice(0, -1), future: [context(state), ...state.future] };
  const target = state.history.at(-1) ?? getUniverseScale(state.activeScaleId).parentId;
  if (!target) return state;

  return {
    ...state,
    activeScaleId: target,
    history: state.history.slice(0, -1),
    selectedObjectId: null,
    traveling: true,
    journeyProgress: getScaleProgress(target),
  };
}

export function travelPhase3State(state: UniverseNavigationState, phase3View: Phase3View, selectedObjectId: string | null = null): UniverseNavigationState {
  if (state.phase3View === phase3View) return { ...state, selectedObjectId: selectedObjectId ?? state.selectedObjectId };
  const perspective = phase3View === 'timeline' ? 'INCARNATE_SELF' : phase3View === 'higher-self' || phase3View === 'planning' ? 'HIGHER_SELF' : state.perspective;
  return { ...state, activeScaleId: 'inner', phase3View, perspective, selectedObjectId, traveling: true, journeyProgress: 1, past: [...state.past, context(state)], future: [] };
}

export function forwardNavigationState(state: UniverseNavigationState): UniverseNavigationState {
  const next = state.future[0];
  return next ? { ...next, traveling: true, past: [...state.past, context(state)], future: state.future.slice(1) } : state;
}

export function finishTravel(state: UniverseNavigationState): UniverseNavigationState {
  if (!state.traveling) return state;
  return { ...state, traveling: false };
}
