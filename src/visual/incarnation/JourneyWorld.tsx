import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { Html } from '@react-three/drei';
import { useSimulationStore } from '../../simulation/store/useSimulationStore.js';
import { visibleLifeEvents } from '../../simulation/incarnation/selectors.js';
import { useUniverseNavigation } from '../navigation/useUniverseNavigation.js';
import { getPhase3View } from '../navigation/phase3Views.js';
import { ExperienceLattice } from './ExperienceLattice.js';
import { PossibilityField } from '../possibility/PossibilityField.js';
import { InformationAtlas } from '../higherSelf/InformationAtlas.js';
import { FieldMembrane } from '../timeSpace/FieldMembrane.js';
import { ProgramConstellation } from './ProgramConstellation.js';
import { useDisplayQuality } from '../components/useDisplayQuality.js';

export function JourneyWorld() {
  const state = useSimulationStore((store) => store.state);
  const dispatch = useSimulationStore((store) => store.dispatch);
  const view = useUniverseNavigation((nav) => nav.phase3View);
  const selectObject = useUniverseNavigation((nav) => nav.selectObject);
  const { compact, reducedMotion } = useDisplayQuality();
  const root = useRef<Group>(null);
  const marker = useRef<Group>(null);
  const lastPosition = useRef(new Vector3(3.2, 0, -96));
  const definition = getPhase3View(view ?? 'timeline');
  const target = useMemo(() => new Vector3(...definition.anchor), [definition]);
  const events = useMemo(() => visibleLifeEvents(state), [state.incarnation, state.timeSpace.perspective]);
  useFrame(({ clock }, delta) => {
    lastPosition.current.lerp(target, 1 - Math.exp(-delta * (reducedMotion ? 12 : 2.25)));
    root.current?.position.copy(lastPosition.current);
    if (marker.current && !reducedMotion) marker.current.rotation.y = clock.elapsedTime * 0.18;
  });
  if (!view) return null;
  const network = view !== 'timeline' || state.timeSpace.reality === 'TIME_SPACE';
  const atlas = view === 'higher-self' || state.timeSpace.perspective === 'TOTALITY';
  const expanded = view === 'possibility';
  return <group ref={root} userData={{ sourceClassification: 'SIMULATION_ABSTRACTION', entityId: state.entity.id }}>
    <FieldMembrane active={network} reducedMotion={reducedMotion} />
    {atlas && <InformationAtlas totality={state.timeSpace.perspective === 'TOTALITY'} reducedMotion={reducedMotion} compact={compact} />}
    {view === 'planning' ? <ProgramConstellation program={state.incarnation.program} /> : !expanded && <ExperienceLattice events={events} network={network} selectedId={state.timeSpace.selectedEventId} integratedIds={state.lifeReview?.integratedEventIds ?? []} onSelect={(eventId) => { dispatch({ type: 'JOURNEY', action: { type: 'INSPECT_EVENT', eventId } }); selectObject(eventId); }} reducedMotion={reducedMotion} compact={compact} />}
    <group ref={marker} position={[expanded ? -1.8 : view === 'planning' ? 0.7 : 1.5, 0, 0]}>
      <mesh><octahedronGeometry args={[0.22, 0]} /><meshStandardMaterial color={state.incarnation.phase === 'DEATH_TRANSITION' ? '#b6a3d8' : '#e4d9b8'} emissive="#a29678" emissiveIntensity={0.8} roughness={0.28} /></mesh>
      <mesh scale={[0.5, 2.7, 0.5]}><octahedronGeometry args={[0.24, 0]} /><meshBasicMaterial color="#a9c7c1" transparent opacity={0.13} depthWrite={false} /></mesh>
    </group>
    {(view === 'timeline' || expanded || view === 'planning' || atlas) && <PossibilityField graph={state.possibilities} perspective={state.timeSpace.perspective} selectedId={state.timeSpace.selectedPossibilityId} onSelect={(possibilityId) => { dispatch({ type: 'JOURNEY', action: { type: 'INSPECT_POSSIBILITY', possibilityId } }); selectObject(possibilityId); }} expanded={expanded} reducedMotion={reducedMotion} compact={compact} />}
    {events.length === 0 && view !== 'planning' && !expanded && <Html position={[-1.3, -0.8, 0]} center><span className="unwritten-label">Your life history is still unwritten.<br />Begin with life programming.</span></Html>}
    <Html position={[-0.2, -3.9, 0]} center style={{ pointerEvents: 'none' }}><span className="world-identity">SAME ENTITY · INCARNATION {state.incarnation.cycle.toString().padStart(2, '0')}</span></Html>
  </group>;
}
