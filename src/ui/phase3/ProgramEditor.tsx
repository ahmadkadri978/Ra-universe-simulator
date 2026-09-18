import { programFields } from '../../domain/incarnation/program.js';
import { useJourneyControls } from './useJourneyControls.js';

export function ProgramEditor() {
  const { state, act, go } = useJourneyControls();
  const editable = state.incarnation.phase === 'PLANNING';
  return <section className="program-editor" data-source-classification="SIMULATION_ABSTRACTION">
    <div className="panel-heading"><span className="eyebrow">MODEL INCARNATION {state.incarnation.cycle.toString().padStart(2, '0')}</span><h2>Set the conditions</h2></div>
    <p className="panel-intro">These example conditions offer a setting for experience. The responses are yours to choose.</p>
    <div className="condition-distinction"><span>Programmed conditions</span><b>≠</b><span>Programmed responses</span></div>
    <form onSubmit={(event) => event.preventDefault()}>
      {programFields.map((field) => <label className="program-field" key={field.key} data-source-classification={field.sourceClassification}>
        <span>{field.label}</span>
        <select aria-label={field.label} value={state.incarnation.program[field.key]} disabled={!editable} onChange={(event) => act({ type: 'PROGRAM', field: field.key, value: event.target.value })}>
          {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>)}
    </form>
    <p className="model-note">SIMULATION ABSTRACTION · All presets are illustrative. Circumstances are not evidence of a chosen lesson.</p>
    {editable ? <button className="journey-primary" onClick={() => { act({ type: 'ENTER' }); go('timeline'); }}>Enter incarnation <span>→</span></button> : <div className="quiet-callout">This incarnation’s conditions are held for review. Complete its review to prepare a new model incarnation.<button className="text-action" onClick={() => go('timeline')}>Return to this life →</button></div>}
  </section>;
}
