import { useEffect, useRef, useState } from 'react';
import { phase3Views, getPhase3View } from '../../visual/navigation/phase3Views.js';
import { useUniverseNavigation } from '../../visual/navigation/useUniverseNavigation.js';
import { useJourneyControls } from './useJourneyControls.js';
import { ProgramEditor } from './ProgramEditor.js';
import { LifeControls } from './LifeControls.js';
import { ReviewPanel } from './ReviewPanel.js';
import { BranchInspector } from './BranchInspector.js';
import { HigherSelfPanel } from './HigherSelfPanel.js';
import { SourceDialog } from './SourceDialog.js';
import type { ConceptId } from '../../domain/ontology/types.js';
import { visibleLifeEvents } from '../../simulation/incarnation/selectors.js';
import './phase3.css';

const stageLabels = { PLANNING: 'Programming', ENTRY: 'Entry', INCARNATE: 'Incarnate experience', DEATH_TRANSITION: 'Death transition', REVIEW: 'Life review', HEALING: 'Healing' } as const;
export function Phase3HUD({ effects, setEffects }: { effects: boolean; setEffects: (value: boolean) => void }) {
  const { state, act, go } = useJourneyControls();
  const navigation = useUniverseNavigation();
  const [source, setSource] = useState<ConceptId | null>(null);
  const [panelOpen, setPanelOpen] = useState(() => !window.matchMedia('(max-width: 860px)').matches);
  const panel = useRef<HTMLElement>(null);
  const view = navigation.phase3View ?? 'timeline';
  const definition = getPhase3View(view);
  useEffect(() => { panel.current?.scrollTo({ top: 0 }); }, [view]);
  const concepts: ConceptId[] = view === 'planning' ? ['incarnation_program', 'program_conditions'] : view === 'higher-self' ? ['higher_self', 'totality', 'perspective_lenses'] : view === 'time-space' ? ['time_space', 'form_maker', 'life_review', 'healing'] : view === 'possibility' ? ['possibility_vortices', 'visual_weights'] : ['space_time', 'veil'];
  return <div className="phase3-interface">
    <header className="phase3-header"><a className="phase3-brand" href="#" onClick={(event) => { event.preventDefault(); navigation.travelTo('entity'); }}><span className="brand-mark">r.</span><span>RA <small>ONTOLOGY SIMULATOR</small></span></a><span className="phase-label">03 / THE LIFE PATTERN</span><div className="phase3-header-actions"><button onClick={navigation.back} disabled={navigation.past.length === 0} aria-label="Back to previous view">←</button><button onClick={navigation.forward} disabled={navigation.future.length === 0} aria-label="Forward to next view">→</button><button onClick={() => setSource(source ? null : definition.conceptId)} aria-expanded={source !== null}>Sources ↗</button><label className="effect-switch"><input type="checkbox" checked={effects} onChange={(event) => setEffects(event.target.checked)} /> Soft light</label></div></header>
    <nav className="phase3-nav" aria-label="Phase 3 spatial navigation">{phase3Views.map((item, i) => <button key={item.id} aria-current={item.id === view ? 'location' : undefined} onClick={() => go(item.id)}><span>{String(i + 1).padStart(2, '0')}</span>{item.label}</button>)}</nav>
    <section className="phase3-title"><span className="eyebrow">{navigation.traveling ? 'MOVING THROUGH THE MODEL' : `${state.timeSpace.reality === 'SPACE_TIME' ? 'SEQUENTIAL' : 'RELATIONAL'} VIEW · SAME ENTITY`}</span><h1>{definition.title}</h1><p>{definition.description}</p><button className="classification-note" onClick={() => setSource('visual_weights')}>SPATIAL MODEL · SIMULATION ABSTRACTION <span>↗</span></button></section>
    <div className="perspective-control"><span className="eyebrow">INFORMATION LENS</span><div role="group" aria-label="Perspective">{([['INCARNATE_SELF', 'Incarnate self'], ['HIGHER_SELF', 'Higher Self'], ['TOTALITY', 'Totality']] as const).map(([perspective, label]) => <button key={perspective} aria-pressed={state.timeSpace.perspective === perspective} onClick={() => act({ type: 'PERSPECTIVE', perspective })}>{label}</button>)}</div><small>{state.timeSpace.perspective === 'INCARNATE_SELF' ? 'Local experience; responses remain yours.' : state.timeSpace.perspective === 'HIGHER_SELF' ? 'Recorded life patterns and optional guidance.' : 'Current + archived experience and branch detail.'} <span>{visibleLifeEvents(state).length} events in view.</span></small></div>
    <button className="mobile-panel-toggle" aria-expanded={panelOpen} onClick={() => setPanelOpen(!panelOpen)}>{panelOpen ? 'Close controls ↓' : 'Open controls ↑'}</button>
    <aside ref={panel} className={`phase3-control-panel ${panelOpen ? 'panel-open' : ''}`} aria-label="Journey controls">
      {view === 'planning' ? <ProgramEditor /> : <>
        {view === 'higher-self' ? <HigherSelfPanel /> : <LifeControls />}
        {view === 'possibility' ? <BranchInspector /> : view !== 'higher-self' ? <ReviewPanel /> : null}
      </>}
      <div className="concept-links"><span>Inspect the source</span>{concepts.map((concept) => <button key={concept} onClick={() => setSource(concept)}>{concept.replaceAll('_', ' ')} ↗</button>)}</div>
    </aside>
    <footer className="phase3-footer"><div><i /> <strong>INCARNATION {String(state.incarnation.cycle).padStart(2, '0')}</strong><span>{stageLabels[state.incarnation.phase]}</span></div><span className="footer-instruction">Drag to orbit · scroll to explore · select a node</span><button onClick={() => navigation.travelTo('inner')}>← Continuous universe</button></footer>
    {source && <SourceDialog conceptId={source} onClose={() => setSource(null)} />}
  </div>;
}
