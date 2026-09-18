import { useMemo } from 'react';
import { Html } from '@react-three/drei';
import type { PossibilityGraph } from '../../domain/possibility/types.js';
import type { PerspectiveMode } from '../../domain/timeSpace/types.js';
import type { Vec3Tuple } from '../navigation/types.js';
import { BranchSpline } from './BranchSpline.js';

export const branchColors = { OPEN: '#9bb8b9', STRENGTHENED: '#b7cfac', WEAKENED: '#867b9b', CLOSED: '#51565c', EMERGENT: '#d2b889' } as const;
export function PossibilityField({ graph, perspective, selectedId, onSelect, expanded, reducedMotion, compact }: {
  graph: PossibilityGraph; perspective: PerspectiveMode; selectedId: string | null; onSelect: (id: string) => void; expanded: boolean; reducedMotion: boolean; compact: boolean;
}) {
  const paths = useMemo(() => graph.nodes.filter((node) => perspective === 'TOTALITY' || node.parentId === null || node.status === 'EMERGENT').slice(0, compact ? 7 : 12).map((node, i, nodes) => {
    const angle = (i / Math.max(1, nodes.length - 1) - 0.5) * Math.PI * 1.25;
    const distance = expanded ? 4 : 2.15;
    const end: Vec3Tuple = [Math.cos(angle) * distance + (expanded ? 0 : 1.6), Math.sin(angle) * (expanded ? 2.65 : 1.45), Math.sin(i * 2.1) * 0.6];
    const points: Vec3Tuple[] = [[expanded ? -1.8 : 1.5, 0, 0], [expanded ? -0.7 : 2, Math.sin(angle) * 0.5, -0.6], [end[0] - 0.45, end[1] * 0.82, 0.8], [end[0] + 0.35, end[1] + 0.18, 0.2], end];
    return { node, points, end };
  }), [graph, perspective, expanded, compact]);
  return <group userData={{ sourceClassification: 'SIMULATION_ABSTRACTION', conceptId: 'visual_weights' }}>
    {paths.map(({ node, points, end }, i) => <group key={node.id}>
      <BranchSpline points={points} color={branchColors[node.status]} opacity={node.status === 'CLOSED' ? 0.13 : 0.25 + node.visualWeight * 0.55} width={0.006 + node.visualWeight * 0.017} animated={!reducedMotion && node.status !== 'CLOSED'} offset={i * 0.21} />
      <mesh position={[...end]} onClick={(e) => { e.stopPropagation(); onSelect(node.id); }} scale={selectedId === node.id ? 1.6 : 1}>
        <octahedronGeometry args={[0.11 + node.visualWeight * 0.065, 0]} />
        <meshStandardMaterial color={branchColors[node.status]} emissive={branchColors[node.status]} emissiveIntensity={node.status === 'CLOSED' ? 0 : 0.65} wireframe={node.status === 'CLOSED'} />
      </mesh>
      {expanded && <Html position={[end[0], end[1] - 0.28, end[2]]} center style={{ pointerEvents: 'none' }}><span className="branch-world-label">{node.status.toLowerCase()}<b>{node.visualWeight.toFixed(2)}</b></span></Html>}
      {perspective === 'TOTALITY' && expanded && node.childPossibilities.map((id) => {
        const child = paths.find((path) => path.node.id === id);
        return child ? <BranchSpline key={id} points={[end, [end[0] + 0.5, (end[1] + child.end[1]) / 2, -0.9], child.end]} color="#d2b889" opacity={0.35} animated={!reducedMotion} width={0.009} /> : null;
      })}
    </group>)}
  </group>;
}
