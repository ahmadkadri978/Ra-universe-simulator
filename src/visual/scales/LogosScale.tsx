import { useRef } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { AdditiveBlending, Group } from 'three';
import { FlowingArc } from '../components/FlowingArc.js';
import { GlowSphere } from '../components/GlowSphere.js';
import { ScaleLabel } from '../components/ScaleLabel.js';

interface LogosScaleProps {
  active: boolean;
  onEnterGalaxy: () => void;
  onInspect: () => void;
}

export function LogosScale({ active, onEnterGalaxy, onInspect }: LogosScaleProps) {
  const lattice = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (lattice.current) lattice.current.rotation.y = clock.elapsedTime * 0.06;
  });

  const enter = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onEnterGalaxy();
  };

  return (
    <group>
      <group ref={lattice} onClick={onInspect}>
        <mesh>
          <icosahedronGeometry args={[1.15, 2]} />
          <meshStandardMaterial
            color="#e4ba5d"
            emissive="#c98a2c"
            emissiveIntensity={active ? 2.6 : 1.2}
            roughness={0.28}
            metalness={0.12}
            wireframe
          />
        </mesh>
        {[0, Math.PI / 3, (Math.PI * 2) / 3].map((rotation) => (
          <mesh key={rotation} rotation={[Math.PI / 2.2, rotation, rotation * 0.6]}>
            <torusGeometry args={[1.65, 0.012, 6, 120]} />
            <meshBasicMaterial color="#f7d98e" transparent opacity={0.3} blending={AdditiveBlending} />
          </mesh>
        ))}
      </group>

      <GlowSphere radius={0.27} color="#fff0b5" intensity={3} onClick={enter} />
      <FlowingArc points={[[-3.1, 0.2, 0], [-1.5, 0.9, 0.2], [0, 0, 0]]} color="#7bbcff" speed={0.09} />
      <FlowingArc points={[[3.1, -0.4, 0], [1.5, -1.0, 0.1], [0, 0, 0]]} color="#7bbcff" speed={0.12} />
      <FlowingArc points={[[0, 2.7, -0.5], [0.8, 1.4, 0.3], [0, 0, 0]]} color="#f4cc75" speed={0.08} />

      <mesh onClick={enter} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.45, 0.035, 8, 128]} />
        <meshBasicMaterial color="#e7bd67" transparent opacity={0.28} blending={AdditiveBlending} />
      </mesh>

      <ScaleLabel title="LOVE / LOGOS" subtitle="focusing · organization · creative principle" position={[0, -2.4, 0]} active={active} />
    </group>
  );
}
