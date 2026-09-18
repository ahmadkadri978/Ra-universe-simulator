import { useMemo, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import type { LifeEvent } from '../../domain/incarnation/events.js';
import type { Vec3Tuple } from '../navigation/types.js';
import { BranchSpline } from '../possibility/BranchSpline.js';

function EventNode({ event, index, count, network, selected, integrated, onSelect, reducedMotion }: {
  event: LifeEvent; index: number; count: number; network: boolean; selected: boolean; integrated: boolean; onSelect: (id: string) => void; reducedMotion: boolean;
}) {
  const ref = useRef<Group>(null);
  const angle = (index / Math.max(1, count)) * Math.PI * 1.7 - 0.85;
  const target = useMemo(() => network ? new Vector3(Math.cos(angle) * 2.75 - 0.5, Math.sin(angle) * 1.7, Math.sin(index * 1.8) * 0.8) : new Vector3(-4.6 + index / Math.max(1, count - 1) * 5.8, Math.sin(index * 0.85) * 0.22, 0), [network, angle, index, count]);
  useFrame((_, delta) => { ref.current?.position.lerp(target, 1 - Math.exp(-delta * (reducedMotion ? 15 : 3))); });
  const color = integrated ? '#91c8aa' : event.kind === 'DEATH' ? '#afa2d3' : event.orientation === 'CONTROL' ? '#cb9c7c' : '#afc9c5';
  return (
    <group ref={ref} userData={{ sourceClassification: 'SIMULATION_ABSTRACTION', eventId: event.id }}>
      <mesh onClick={(event3d) => { event3d.stopPropagation(); onSelect(event.id); }} scale={selected ? 1.35 : 1} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.15, 0.15, 0.1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={selected ? 1.4 : 0.4} roughness={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[selected ? 0.28 : 0.21, 0.006, 4, 32, integrated ? Math.PI * 2 : Math.PI * 1.55]} />
        <meshBasicMaterial color={color} transparent opacity={selected ? 0.9 : 0.4} />
      </mesh>
      <Html position={[0, -0.36, 0]} center style={{ pointerEvents: 'none' }}>
        <span className={`event-world-label ${selected ? 'is-selected' : ''}`}>{event.sequence === 0 ? 'ENTRY' : event.kind === 'DEATH' ? 'TRANSITION' : `EXPERIENCE ${event.sequence}`}</span>
      </Html>
    </group>
  );
}

export function ExperienceLattice({ events, network, selectedId, integratedIds, onSelect, reducedMotion, compact }: {
  events: LifeEvent[]; network: boolean; selectedId: string | null; integratedIds: string[]; onSelect: (id: string) => void; reducedMotion: boolean; compact: boolean;
}) {
  const visible = events.slice(-(compact ? 8 : 14));
  const paths = useMemo(() => {
    const positions = visible.map((_, i): Vec3Tuple => network ? [Math.cos(i / Math.max(1, visible.length) * Math.PI * 1.7 - 0.85) * 2.75 - 0.5, Math.sin(i / Math.max(1, visible.length) * Math.PI * 1.7 - 0.85) * 1.7, Math.sin(i * 1.8) * 0.8] : [-4.6 + i / Math.max(1, visible.length - 1) * 5.8, Math.sin(i * 0.85) * 0.22, 0]);
    return positions.flatMap((p, i) => {
      const next = positions[i + 1];
      const links: Vec3Tuple[][] = next ? [[p, [(p[0] + next[0]) / 2, (p[1] + next[1]) / 2 + (network ? 0.5 : 0.04), network ? -0.5 : 0], next]] : [];
      if (network) for (let j = i + 2; j < visible.length; j++) {
        const a = visible[i]?.catalyst; const b = visible[j]?.catalyst; const destination = positions[j];
        if (a && b && destination && (a.lesson === b.lesson || a.relationship === b.relationship)) links.push([p, [0, -0.5, -1.1], destination]);
      }
      return links;
    });
  }, [events, network, compact]);
  return (
    <group userData={{ sourceClassification: 'SIMULATION_ABSTRACTION', conceptId: network ? 'life_review' : 'space_time' }}>
      {paths.map((points, i) => <BranchSpline key={`${network}-${i}`} points={points} opacity={network ? 0.24 : 0.55} width={0.008} animated={!reducedMotion && i < 6} offset={i * 0.2} />)}
      {visible.map((event, i) => <EventNode key={event.id} event={event} index={i} count={visible.length} network={network} selected={selectedId === event.id} integrated={integratedIds.includes(event.id)} onSelect={onSelect} reducedMotion={reducedMotion} />)}
    </group>
  );
}
