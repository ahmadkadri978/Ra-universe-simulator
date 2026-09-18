import { useJourneyControls } from './useJourneyControls.js';

export function HigherSelfPanel() {
  const { state, act, go } = useJourneyControls();
  const guidance = state.higherSelf.guidance;
  return <section className="higher-self-panel">
    <span className="eyebrow">ASSISTANCE WITHOUT CONTROL</span><h2>A map, with roads still open.</h2>
    <p>Ra describes a broader accumulated perspective. This model can expose only the lessons and patterns recorded in your session.</p>
    <div className="authority-card"><span>May offer</span><b>Patterns · healing · programming</b><span>Choice authority</span><b>Remains with the incarnate entity</b></div>
    <button className="journey-primary" onClick={() => act({ type: 'GUIDANCE' })}>Expose recorded patterns <span>↗</span></button>
    {guidance && <div className="guidance-result" aria-live="polite" data-source-classification="INFERRED"><span className="eyebrow">INFERRED FROM YOUR RECORDED EVENTS</span>{guidance.patterns.map((pattern) => <p key={pattern}>{pattern}</p>)}<p>Possible planning focus: <strong>{guidance.suggestedLessons.join(' · ')}</strong></p><small>Suggestions are optional. No response, orientation, or branch was changed.</small></div>}
    <button className="journey-secondary" onClick={() => go('possibility')}>Explore the possibility field →</button>
    <div className="totality-note"><h3>Totality as a resource</h3><p>Select the Totality lens to include archived experiences and more branch detail. This expands the model’s information window; the geometry is an abstraction.</p></div>
  </section>;
}
