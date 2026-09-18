import { useSimulationStore } from '../../simulation/store/useSimulationStore.js';
import { useUniverseNavigation } from '../../visual/navigation/useUniverseNavigation.js';
import type { Phase3View } from '../../visual/navigation/phase3Views.js';
import type { JourneyAction } from '../../simulation/incarnation/actions.js';

export function useJourneyControls() {
  const state = useSimulationStore((store) => store.state);
  const dispatch = useSimulationStore((store) => store.dispatch);
  const enterPhase3 = useUniverseNavigation((nav) => nav.enterPhase3);
  const act = (action: JourneyAction) => {
    dispatch({ type: 'JOURNEY', action });
    if (action.type === 'PERSPECTIVE') useUniverseNavigation.getState().setPerspective(action.perspective);
  };
  const go = (view: Phase3View) => {
    enterPhase3(view);
  };
  return { state, act, go };
}
