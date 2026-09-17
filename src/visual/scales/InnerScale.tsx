import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, BufferGeometry, Float32BufferAttribute, Group } from 'three';
import { GlowSphere } from '../components/GlowSphere.js';
import { ScaleLabel } from '../components/ScaleLabel.js';
import { mulberry32 } from '../utils/seeded.js';

interface InnerScaleProps {
  active: boolean;
  onInspect: () => void;
}

export function InnerScale({ active, onInspect }: InnerScaleProps) {
  const root = useRef<Group>(null);
  const network = useMemo(() => {
    const random = mulberry32(39012);
    const nodes: [number, number, number][] = [[0, 0, 0]];
    const lines: number[] = [];
    for (let i = 1; i < 58; i += 1) {
      const parentIndex = Math.floor(random() * Math.max(1, Math.min(i, 16)));
      const parent = nodes[parentIndex] ?? [0, 0, 0];
      const direction = [random() - 0.5, random() - 0.5, random() - 0.5] as [number, number, number];
      const length = 0.28 + random() * 0.52;
      const magnitude = Math.hypot(...direction) || 1;
      const child: [number, number, number] = [
        parent[0] + (direction[0] / magnitude) * length,
        parent[1] + (direction[1] / magnitude) * length,
        parent[2] + (direction[2] / magnitude) * length,
      ];
      nodes.push(child);
      lines.push(...parent, ...child);
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(lines, 3));
    return { nodes, geometry };
  }, []);

  useFrame(({ clock }) => {
    if (!root.current) return;
    root.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.18;
    root.current.rotation.x = Math.cos(clock.elapsedTime * 0.07) * 0.09;
  });

  return (
    <group ref={root} onClick={onInspect}>
      <lineSegments geometry={network.geometry}>
        <lineBasicMaterial color="#8ac4eb" transparent opacity={active ? 0.28 : 0.12} blending={AdditiveBlending} />
      </lineSegments>
      {network.nodes.map((position, index) => (
        <GlowSphere
          key={`${position.join('-')}-${index}`}
          radius={index === 0 ? 0.16 : index < 8 ? 0.055 : 0.025}
          color={index === 0 ? '#f0cf7c' : index % 3 === 0 ? '#93d2be' : '#8cbce4'}
          position={position}
          intensity={index === 0 ? 2.7 : 0.55}
        />
      ))}
      <ScaleLabel title="INNER CONSCIOUSNESS" subtitle="interpretive topology for inward relation and integration" position={[0, -2.0, 0]} active={active} />
    </group>
  );
}
