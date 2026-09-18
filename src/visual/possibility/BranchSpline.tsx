import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CatmullRomCurve3, Mesh, Vector3 } from 'three';
import type { Vec3Tuple } from '../navigation/types.js';

export function BranchSpline({ points, color = '#8cb7b2', opacity = 0.6, width = 0.012, animated = true, offset = 0 }: {
  points: readonly Vec3Tuple[]; color?: string; opacity?: number; width?: number; animated?: boolean; offset?: number;
}) {
  const curve = useMemo(() => new CatmullRomCurve3(points.map((point) => new Vector3(...point))), [points]);
  const particle = useRef<Mesh>(null);
  const sample = useMemo(() => new Vector3(), []);
  useFrame(({ clock }) => {
    if (particle.current && animated) particle.current.position.copy(curve.getPointAt((clock.elapsedTime * 0.085 + offset) % 1, sample));
  });
  return (
    <group userData={{ sourceClassification: 'SIMULATION_ABSTRACTION', conceptId: 'visual_weights' }}>
      <mesh>
        <tubeGeometry args={[curve, 48, width, 5, false]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
      </mesh>
      {animated && <mesh ref={particle}>
        <octahedronGeometry args={[0.044, 0]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>}
    </group>
  );
}
