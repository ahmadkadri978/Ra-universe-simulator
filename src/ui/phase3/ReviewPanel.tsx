import { visibleLifeEvents, selectedLifeEvent } from '../../simulation/incarnation/selectors.js';
import { useUniverseNavigation } from '../../visual/navigation/useUniverseNavigation.js';
import { useJourneyControls } from './useJourneyControls.js';

export function ReviewPanel() {
  const { state, act } = useJourneyControls();
  const selectObject = useUniverseNavigation((nav) => nav.selectObject);
  const events = visibleLifeEvents(state);
  const selected = selectedLifeEvent(state);
  const integrated = selected && state.lifeReview?.integratedEventIds.includes(selected.id);
  return <section className="review-panel" data-source-classification="SIMULATION_ABSTRACTION">
    <div className="section-title"><h3>Recorded experience</h3><span>{events.length} visible</span></div>
    {events.length === 0 ? <p className="empty-message">No life events yet. Planning does not write your choices in advance.</p> : <div className="event-list" aria-label="Recorded life events">
      {events.map((event) => <button key={event.id} aria-pressed={selected?.id === event.id} onClick={() => { act({ type: 'INSPECT_EVENT', eventId: event.id }); selectObject(event.id); }}><span>{String(event.sequence).padStart(2, '0')}</span><b>{event.label}</b><small>{event.choice?.response ?? (event.kind === 'CATALYST' ? 'unanswered' : event.kind.toLowerCase())}</small></button>)}
    </div>}
    {selected && events.some((event) => event.id === selected.id) && <article className="event-detail">
      <h3>{selected.label}</h3>
      <dl><div><dt>Response</dt><dd>{selected.choice?.response ?? 'No response recorded'}</dd></div><div><dt>Orientation tendency</dt><dd>{selected.orientation.toLowerCase()}</dd></div><div><dt>Energy tendency</dt><dd>{selected.energyResponse}</dd></div><div><dt>Relationship</dt><dd>{selected.catalyst?.relationship ?? '—'}</dd></div><div><dt>Lesson</dt><dd>{selected.catalyst?.lesson ?? '—'}</dd></div></dl>
      {state.incarnation.phase === 'HEALING' && state.lifeReview?.eventIds.includes(selected.id) && selected.kind === 'CATALYST' && <button className="journey-secondary" disabled={integrated} onClick={() => act({ type: 'INTEGRATE', eventId: selected.id })}>{integrated ? 'Marked as integrated ✓' : 'Mark this experience as integrated'}</button>}
      <small className="model-note">Event grouping and energy tendencies are simulation abstractions.</small>
    </article>}
    {state.lifeReview && <div className="pattern-summary"><h3>Patterns in this incarnation</h3>{state.lifeReview.patterns.length === 0 ? <p>No catalyst events to group.</p> : state.lifeReview.patterns.map((pattern) => <p key={`${pattern.lesson}-${pattern.response}`}><strong>{pattern.lesson}</strong><span>{pattern.response} · {pattern.eventIds.length} experience{pattern.eventIds.length === 1 ? '' : 's'}</span></p>)}<small>{state.lifeReview.integratedEventIds.length} integrated · {state.lifeReview.unresolvedEventIds.length} awaiting reflection</small></div>}
  </section>;
}
