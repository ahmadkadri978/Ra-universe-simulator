import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { ContinuousUniverseScene } from '../visual/scenes/ContinuousUniverseScene.js';
import { SourceInspector } from '../ui/SourceInspector.js';
import { UniverseHUD } from '../ui/phase2/UniverseHUD.js';
import { Phase2Legend } from '../ui/phase2/Phase2Legend.js';
import { useSimulationStore } from '../simulation/store/useSimulationStore.js';
import { getUniverseScale } from '../visual/navigation/universeGraph.js';
import { useUniverseNavigation } from '../visual/navigation/useUniverseNavigation.js';
import type { ConceptId } from '../domain/ontology/types.js';
import { Phase3HUD } from '../ui/phase3/Phase3HUD.js';
import { SoftBloom } from '../visual/effects/SoftBloom.js';
import { useDisplayQuality } from '../visual/components/useDisplayQuality.js';

export function App() {
  const selectedConceptId = useSimulationStore((store) => store.state.selectedConceptId);
  const dispatch = useSimulationStore((store) => store.dispatch);
  const activeScaleId = useUniverseNavigation((state) => state.activeScaleId);
  const phase3View = useUniverseNavigation((state) => state.phase3View);
  const perspective = useUniverseNavigation((state) => state.perspective);
  const selectedObjectId = useUniverseNavigation((state) => state.selectedObjectId);
  const { compact, reducedMotion } = useDisplayQuality();
  const [effects, setEffects] = useState(!compact && !reducedMotion);

  const selectConcept = (conceptId: ConceptId) => {
    dispatch({ type: 'SELECT_CONCEPT', conceptId });
  };

  useEffect(() => {
    const conceptId = getUniverseScale(activeScaleId).ontologyConceptId;
    dispatch({ type: 'SELECT_CONCEPT', conceptId });
  }, [activeScaleId, dispatch]);

  useEffect(() => {
    if (!phase3View) return;
    dispatch({ type: 'JOURNEY', action: { type: 'REALITY', reality: phase3View === 'timeline' ? 'SPACE_TIME' : 'TIME_SPACE' } });
    dispatch({ type: 'JOURNEY', action: { type: 'PERSPECTIVE', perspective } });
    if (selectedObjectId) {
      dispatch({ type: 'JOURNEY', action: { type: 'INSPECT_EVENT', eventId: selectedObjectId } });
      dispatch({ type: 'JOURNEY', action: { type: 'INSPECT_POSSIBILITY', possibilityId: selectedObjectId } });
    }
  }, [phase3View, perspective, selectedObjectId, dispatch]);

  return (
    <main className={phase3View ? 'phase2-shell phase3-shell' : 'phase2-shell'}>
      <div className="universe-canvas-wrap" role="img" aria-label="Interactive continuous universe. All actions and event details are also available in the journey controls.">
        <Canvas
          fallback={<p className="canvas-fallback">3D requires WebGL. You can still explore the model through the journey controls.</p>}
          camera={{ position: [0, 0.5, 11], fov: 48, near: 0.05, far: 150 }}
          dpr={[1, compact ? 1.25 : 1.6]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <ContinuousUniverseScene onSelectConcept={selectConcept} />
            {phase3View && effects && !compact && <SoftBloom />}
          </Suspense>
        </Canvas>
        <div className="cinematic-vignette" aria-hidden="true" />
      </div>

      {phase3View ? <Phase3HUD effects={effects} setEffects={setEffects} /> : <>
        <UniverseHUD />
        <Phase2Legend />
        <aside className="phase2-source-drawer glass-panel">
          <SourceInspector conceptId={selectedConceptId} />
        </aside>
      </>}
    </main>
  );
}
