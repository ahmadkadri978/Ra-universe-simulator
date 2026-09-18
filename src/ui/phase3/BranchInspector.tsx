import { useJourneyControls } from './useJourneyControls.js';
import { branchColors } from '../../visual/possibility/PossibilityField.js';
import { useUniverseNavigation } from '../../visual/navigation/useUniverseNavigation.js';

export function BranchInspector() {
  const { state, act } = useJourneyControls();
  const nodes = state.possibilities.nodes;
  const selectObject = useUniverseNavigation((nav) => nav.selectObject);
  const selected = nodes.find((node) => node.id === state.timeSpace.selectedPossibilityId);
  return <section className="branch-inspector" data-source-classification="SIMULATION_ABSTRACTION">
    <div className="section-title"><h3>Possibilities around this decision</h3><span>{nodes.length}</span></div>
    <p className="model-note">VISUAL WEIGHTS · Independent emphasis values, not probabilities. The field does not choose a path. {state.timeSpace.perspective === 'TOTALITY' && 'Gold connections trace actual parent–child branches.'}</p>
    <div className="branch-list">{nodes.map((node) => <button key={node.id} aria-pressed={selected?.id === node.id} onClick={() => { act({ type: 'INSPECT_POSSIBILITY', possibilityId: node.id }); selectObject(node.id); }}>
      <i style={{ background: branchColors[node.status] }} /><span><b>{node.label}</b><small>{node.status.toLowerCase()} · visual weight {node.visualWeight.toFixed(2)}</small><em style={{ width: `${node.visualWeight * 100}%`, background: branchColors[node.status] }} /></span>
    </button>)}</div>
    {selected && <article className="event-detail"><h3>{selected.label}</h3><dl><div><dt>Related lesson</dt><dd>{selected.relatedLessons.join(', ')}</dd></div><div><dt>Energy tendencies</dt><dd>{selected.energyCenterTendencies.join(' / ')}</dd></div><div><dt>Child possibilities</dt><dd>{selected.childPossibilities.length}</dd></div></dl><p>{selected.status === 'CLOSED' ? 'This illustrative invitation closed after a response. Other paths remain open, including the ability to defer a later choice.' : 'This branch is an illustrative possibility, not an outcome the program will enforce.'}</p></article>}
  </section>;
}
