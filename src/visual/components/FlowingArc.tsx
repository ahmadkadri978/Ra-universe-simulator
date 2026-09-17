import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  AdditiveBlending,
  CatmullRomCurve3,
  Mesh,
  Vector3,
} from 'three';

interface FlowingArcProps {
  points: readonly (readonly [number, number, number])[];
  color: string;
  radius?: number;
  opacity?: number;
  speed?: number;
  particleSize?: number;
}

export function FlowingArc({
  points,
  color,
  radius = 0.018,
  opacity = 0.45,
  speed = 0.11,
  particleSize = 0.055,
}: FlowingArcProps) {
  const particle = useRef<Mesh>(null);
  const curve = useMemo(
    () => new CatmullRomCurve3(points.map((point) => new Vector3(...point)), false, 'catmullrom', 0.55),
    [points],
  );
  const tube = useMemo(() => curve.getPoints(56), [curve]);

  useFrame(({ clock }) => {
    const mesh = particle.current;
    if (!mesh) return;
    const t = (clock.elapsedTime * speed) % 1;
    mesh.position.copy(curve.getPointAt(t));
  });

  return (
    <group>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(tube.flatMap((point) => [point.x, point.y, point.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={opacity} blending={AdditiveBlending} />
      </line>
      <mesh ref={particle}>
        <sphereGeometry args={[particleSize + radius * 0.5, 14, 14]} />
        <meshBasicMaterial color={color} blending={AdditiveBlending} transparent opacity={0.9} depthWrite={false} />
      </mesh>
    </group>
  );
}
