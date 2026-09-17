import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { ContinuousUniverseScene } from '../visual/scenes/ContinuousUniverseScene.js';
import { SourceInspector } from '../ui/SourceInspector.js';
import { UniverseHUD } from '../ui/phase2/UniverseHUD.js';
import { Phase2Legend } from '../ui/phase2/Phase2Legend.js';
import { useSimulationStore } from '../simulation/store/useSimulationStore.js';
import { getUniverseScale } from '../visual/navigation/universeGraph.js';
import { useUniverseNavigation } from '../visual/navigation/useUniverseNavigation.js';
import type { ConceptId } from '../domain/ontology/types.js';

export function App() {
  const selectedConceptId = useSimulationStore((store) => store.state.selectedConceptId);
  const dispatch = useSimulationStore((store) => store.dispatch);
  const activeScaleId = useUniverseNavigation((state) => state.activeScaleId);

  const selectConcept = (conceptId: ConceptId) => {
    dispatch({ type: 'SELECT_CONCEPT', conceptId });
  };

  useEffect(() => {
    const conceptId = getUniverseScale(activeScaleId).ontologyConceptId;
    dispatch({ type: 'SELECT_CONCEPT', conceptId });
  }, [activeScaleId, dispatch]);

  return (
    <main className="phase2-shell">
      <div className="universe-canvas-wrap">
        <Canvas
          camera={{ position: [0, 0.5, 11], fov: 48, near: 0.05, far: 150 }}
          dpr={[1, 1.8]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <ContinuousUniverseScene onSelectConcept={selectConcept} />
          </Suspense>
        </Canvas>
        <div className="cinematic-vignette" aria-hidden="true" />
      </div>

      <UniverseHUD />
      <Phase2Legend />

      <aside className="phase2-source-drawer glass-panel">
        <SourceInspector conceptId={selectedConceptId} />
      </aside>
    </main>
  );
}
