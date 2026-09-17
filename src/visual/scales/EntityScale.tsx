import type { ThreeEvent } from '@react-three/fiber';
import { AdditiveBlending } from 'three';
import { GlowSphere } from '../components/GlowSphere.js';
import { ScaleLabel } from '../components/ScaleLabel.js';

interface EntityScaleProps {
  active: boolean;
  onEnterEnergy: () => void;
  onInspect: () => void;
}

const centerPositions: readonly [string, string, [number, number, number]][] = [
  ['red', '#da5b4d', [0, -1.2, 0]],
  ['orange', '#e99348', [0, -0.82, 0]],
  ['yellow', '#e9c85d', [0, -0.43, 0]],
  ['green', '#66c691', [0, 0.0, 0]],
  ['blue', '#64aee8', [0, 0.42, 0]],
  ['indigo', '#7778d9', [0, 0.82, 0]],
  ['violet', '#b583dc', [0, 1.18, 0]],
] as const;

export function EntityScale({ active, onEnterEnergy, onInspect }: EntityScaleProps) {
  const enter = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onEnterEnergy();
  };

  return (
    <group onClick={onInspect}>
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshBasicMaterial color="#b5d8ff" transparent opacity={0.18} wireframe />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <capsuleGeometry args={[0.38, 2.15, 10, 22]} />
        <meshBasicMaterial color="#7caed8" transparent opacity={active ? 0.10 : 0.055} wireframe />
      </mesh>
      <mesh position={[0, 0.28, 0]} scale={[1.7, 2.5, 1.1]}>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshBasicMaterial color="#5da5d1" transparent opacity={0.018} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
      {centerPositions.map(([id, color, position], index) => (
        <GlowSphere
          key={id}
          radius={index === 3 ? 0.13 : 0.09}
          color={color}
          position={position}
          intensity={active ? 1.7 : 0.8}
          onClick={index === 3 || index === 5 ? enter : undefined}
        />
      ))}
      <mesh onClick={enter} position={[0, 0, 0]} scale={[1.1, 2.4, 1.1]}>
        <sphereGeometry args={[0.82, 24, 24]} />
        <meshBasicMaterial color="#8fd8ff" transparent opacity={0.008} />
      </mesh>
      <ScaleLabel title="MIND / BODY / SPIRIT COMPLEX" subtitle="click the energetic core to move inward" position={[0, -1.9, 0]} active={active} />
    </group>
  );
}
