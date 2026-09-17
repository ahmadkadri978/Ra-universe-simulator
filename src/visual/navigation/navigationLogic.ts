import { getScaleIndex, getScaleProgress, getUniverseScale } from './universeGraph.js';
import type { UniverseNavigationState, UniverseScaleId } from './types.js';

export const createInitialUniverseNavigationState = (): UniverseNavigationState => ({
  activeScaleId: 'infinity',
  history: [],
  selectedObjectId: null,
  traveling: false,
  journeyProgress: 0,
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
  if (to === state.activeScaleId) {
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
  };
}

export function backNavigationState(state: UniverseNavigationState): UniverseNavigationState {
  const target = state.history.at(-1) ?? getUniverseScale(state.activeScaleId).parentId;
  if (!target) return state;

  return {
    activeScaleId: target,
    history: state.history.slice(0, -1),
    selectedObjectId: null,
    traveling: true,
    journeyProgress: getScaleProgress(target),
  };
}

export function finishTravel(state: UniverseNavigationState): UniverseNavigationState {
  if (!state.traveling) return state;
  return { ...state, traveling: false };
}
