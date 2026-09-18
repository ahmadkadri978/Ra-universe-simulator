import { canRespond } from '../../simulation/incarnation/selectors.js';
import { useJourneyControls } from './useJourneyControls.js';

export function LifeControls() {
  const { state, act, go } = useJourneyControls();
  const life = state.incarnation;
  return <section className="life-controls" data-source-classification="SIMULATION_ABSTRACTION">
    {life.phase === 'PLANNING' && <><h2>A life is waiting to begin.</h2><p>Choose a lesson focus and a setting. No response has been assigned.</p><button className="journey-primary" onClick={() => go('planning')}>Open life programming <span>→</span></button></>}
    {life.phase === 'ENTRY' && <><span className="eyebrow">INCARNATION ENTRY</span><h2>A limited point of view.</h2><p>The program is present as conditions. Entering the veil narrows the information view to local experience.</p><button className="journey-primary" onClick={() => { act({ type: 'VEIL' }); go('timeline'); }}>Enter the veil <span>→</span></button></>}
    {life.phase === 'INCARNATE' && <>
      {life.pendingCatalyst ? <>
        <span className="eyebrow">ILLUSTRATIVE CATALYST</span><h2>{life.pendingCatalyst.label}</h2><p>{life.pendingCatalyst.description}</p>
        <div className="choice-list" role="group" aria-label="Choose your response">
          {([['accept', 'Meet it with openness', 'Acknowledge the experience and consider connection.'], ['control', 'Direct the situation', 'Organize the encounter around your own intention.'], ['defer', 'Leave it unresolved', 'Hold uncertainty without resolving it now.']] as const).map(([response, title, description]) => <button key={response} disabled={!canRespond(state)} onClick={() => { act({ type: 'CHOOSE', actor: 'ENTITY', response }); go('possibility'); }}><span>{title}</span><small>{description}</small><b>↗</b></button>)}
        </div>
        {!canRespond(state) && <div className="quiet-callout">This lens can expose paths. Only the incarnate self can choose.<button className="text-action" onClick={() => act({ type: 'PERSPECTIVE', perspective: 'INCARNATE_SELF' })}>Return to incarnate self →</button></div>}
      </> : <>
        <span className="eyebrow">THE NEXT RESPONSE IS OPEN</span><h2>{life.events.some((event) => event.choice) ? 'A choice reshaped the field.' : 'Experience begins with catalyst.'}</h2>
        <p>{life.events.some((event) => event.choice) ? 'Some branches now carry more visual emphasis. Others weaken, close, or emerge. A future response is still undecided.' : 'Meet an example event within your programmed conditions. The model will wait for your response.'}</p>
        <button className="journey-primary" onClick={() => { act({ type: 'CATALYST' }); go('timeline'); }}>Meet {life.events.some((event) => event.choice) ? 'another' : 'the first'} catalyst <span>→</span></button>
      </>}
      <button className="text-action death-action" onClick={() => { act({ type: 'DEATH' }); go('time-space'); }}>Explore physical death & transition →</button>
    </>}
    {life.phase === 'DEATH_TRANSITION' && <><span className="eyebrow">INDIGO / FORM-MAKER REFERENCE</span><h2>The history remains.</h2><p>The embodied trajectory opens into relationships. This transition models the indigo-body reference in 47.11–47.15; its shape and timing are visual abstractions.</p><button className="journey-primary" onClick={() => { act({ type: 'REVIEW' }); go('time-space'); }}>Review this life <span>→</span></button></>}
    {life.phase === 'REVIEW' && <><span className="eyebrow">LIFE REVIEW</span><h2>See what repeats.</h2><p>Inspect the experiences below. Their patterns come from the choices actually recorded in this incarnation.</p><button className="journey-primary" onClick={() => act({ type: 'HEALING' })}>Begin healing / integration <span>→</span></button></>}
    {life.phase === 'HEALING' && <><span className="eyebrow">HEALING / INTEGRATION</span><h2>Make room for understanding.</h2><p>Mark experiences you have reflected on as integrated. These annotations do not judge the response or measure metaphysical healing.</p><button className="journey-primary" onClick={() => { act({ type: 'NEXT_INCARNATION' }); go('planning'); }}>Prepare another incarnation <span>→</span></button><small className="model-note">Unresolved experiences may remain. Integration is not an entry requirement.</small></>}
  </section>;
}
