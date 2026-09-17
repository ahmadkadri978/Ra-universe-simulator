import { useMemo, useRef } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { AdditiveBlending, Group } from 'three';
import { GlowSphere } from '../components/GlowSphere.js';
import { ScaleLabel } from '../components/ScaleLabel.js';
import { mulberry32 } from '../utils/seeded.js';

interface GalaxyScaleProps {
  active: boolean;
  onEnterStar: () => void;
  onInspect: () => void;
}

export function GalaxyScale({ active, onEnterStar, onInspect }: GalaxyScaleProps) {
  const group = useRef<Group>(null);
  const positions = useMemo(() => {
    const random = mulberry32(8172);
    const count = 2100;
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const arm = i % 4;
      const r = Math.pow(random(), 0.62) * 4.8;
      const angle = arm * (Math.PI / 2) + r * 1.42 + (random() - 0.5) * 0.65;
      const scatter = (random() - 0.5) * (0.12 + r * 0.04);
      const index = i * 3;
      values[index] = Math.cos(angle) * r + scatter;
      values[index + 1] = (random() - 0.5) * (0.12 + (4.8 - r) * 0.02);
      values[index + 2] = Math.sin(angle) * r + scatter;
    }
    return values;
  }, []);

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.elapsedTime * 0.025;
  });

  const enter = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onEnterStar();
  };

  return (
    <group ref={group} rotation={[0.22, 0, -0.08]} onClick={onInspect}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#a7c9ff"
          size={active ? 0.05 : 0.035}
          transparent
          opacity={active ? 0.72 : 0.34}
          blending={AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
      <GlowSphere radius={0.36} color="#f4dc9d" intensity={2.7} />
      <group position={[2.2, 0.08, -0.6]}>
        <GlowSphere radius={0.13} color="#fff3c3" intensity={3.4} onClick={enter} />
        <mesh onClick={enter}>
          <sphereGeometry args={[0.45, 20, 20]} />
          <meshBasicMaterial color="#9ec8ff" transparent opacity={0.055} blending={AdditiveBlending} />
        </mesh>
      </group>
      <ScaleLabel title="LOCAL CREATION" subtitle="click the highlighted stellar locus" position={[0, -3.0, 0]} active={active} />
    </group>
  );
}
