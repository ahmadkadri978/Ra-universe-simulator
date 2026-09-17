import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { FoundationScene } from '../visual/scenes/FoundationScene.js';
import { SourceInspector } from '../ui/SourceInspector.js';
import { SimulationStatus } from '../ui/SimulationStatus.js';
import { useSimulationStore } from '../simulation/store/useSimulationStore.js';
import type { ConceptId } from '../domain/ontology/types.js';

export function App() {
  const state = useSimulationStore((store) => store.state);
  const dispatch = useSimulationStore((store) => store.dispatch);

  const selectConcept = (conceptId: ConceptId) => {
    dispatch({ type: 'SELECT_CONCEPT', conceptId });
  };

  const runDemoCatalyst = (response: 'acceptance' | 'control') => {
    dispatch({
      type: 'APPLY_CATALYST',
      catalyst: {
        id: `demo-${Date.now()}`,
        category: 'social-friction',
        intensity: 0.72,
        perception: response === 'acceptance' ? 'Opportunity to understand' : 'Threat to autonomy',
        response,
      },
    });
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <span className="eyebrow">PHASE 1 · PRODUCTION FOUNDATION</span>
          <h1>The Law of One Ontology Simulator</h1>
        </div>
        <div className="topbar-actions">
          <button onClick={() => runDemoCatalyst('acceptance')}>Acceptance catalyst</button>
          <button onClick={() => runDemoCatalyst('control')}>Control catalyst</button>
          <button className="secondary" onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
        </div>
      </header>

      <section className="workspace">
        <div className="scene-panel">
          <Canvas camera={{ position: [0, 0, 8], fov: 48 }} dpr={[1, 1.75]}>
            <Suspense fallback={null}>
              <FoundationScene
                selectedConceptId={state.selectedConceptId}
                onSelectConcept={selectConcept}
              />
            </Suspense>
          </Canvas>
          <div className="scene-caption">
            <span>Architecture preview</span>
            <small>Click a luminous node to inspect its source mapping.</small>
          </div>
        </div>

        <div className="right-rail">
          <SimulationStatus state={state} />
          <SourceInspector conceptId={state.selectedConceptId} />
        </div>
      </section>
    </main>
  );
}
