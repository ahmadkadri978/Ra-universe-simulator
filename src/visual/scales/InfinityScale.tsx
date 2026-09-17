import { useMemo, useRef } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { AdditiveBlending, Group } from 'three';
import { ScaleLabel } from '../components/ScaleLabel.js';
import { mulberry32 } from '../utils/seeded.js';

interface InfinityScaleProps {
  active: boolean;
  onEnterLogos: () => void;
  onInspectFreeWill: () => void;
}

export function InfinityScale({ active, onEnterLogos, onInspectFreeWill }: InfinityScaleProps) {
  const asymmetry = useRef<Group>(null);
  const positions = useMemo(() => {
    const random = mulberry32(1307);
    const values = new Float32Array(1800 * 3);
    for (let i = 0; i < 1800; i += 1) {
      const radius = Math.pow(random(), 0.42) * 6.8;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const index = i * 3;
      values[index] = radius * Math.sin(phi) * Math.cos(theta);
      values[index + 1] = radius * Math.cos(phi);
      values[index + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return values;
  }, []);

  useFrame(({ clock }) => {
    if (!asymmetry.current) return;
    const t = clock.elapsedTime;
    asymmetry.current.rotation.y = t * 0.08;
    asymmetry.current.rotation.z = Math.sin(t * 0.17) * 0.22;
  });

  const enter = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onEnterLogos();
  };

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#b6cbff"
          size={active ? 0.035 : 0.024}
          sizeAttenuation
          transparent
          opacity={active ? 0.46 : 0.2}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>

      {[2.8, 4.3, 6.1].map((radius, index) => (
        <mesh key={radius} scale={[1, 0.94 + index * 0.02, 1]}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshBasicMaterial
            color={index === 0 ? '#d9e4ff' : '#6f94d9'}
            wireframe
            transparent
            opacity={active ? 0.025 : 0.01}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      <group ref={asymmetry} onClick={onInspectFreeWill}>
        <mesh rotation={[0.35, 0.4, 0.2]} onDoubleClick={enter}>
          <torusGeometry args={[1.55, 0.025, 8, 96, Math.PI * 1.42]} />
          <meshBasicMaterial color="#86b8ff" transparent opacity={0.5} blending={AdditiveBlending} />
        </mesh>
        <mesh rotation={[-0.3, -0.1, 1.25]} onClick={enter}>
          <torusGeometry args={[1.08, 0.035, 8, 80, Math.PI * 1.12]} />
          <meshBasicMaterial color="#f0cf7b" transparent opacity={0.7} blending={AdditiveBlending} />
        </mesh>
      </group>

      <mesh onClick={enter}>
        <sphereGeometry args={[0.36, 32, 32]} />
        <meshBasicMaterial color="#fff5cf" transparent opacity={0.7} blending={AdditiveBlending} />
      </mesh>

      <ScaleLabel
        title="INTELLIGENT INFINITY"
        subtitle="click the first asymmetry to follow the focusing of infinity"
        position={[0, -2.0, 0]}
        active={active}
      />
    </group>
  );
}
