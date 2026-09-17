import { useMemo } from 'react';
import { AdditiveBlending, BufferGeometry, Float32BufferAttribute } from 'three';
import type { ThreeEvent } from '@react-three/fiber';
import { GlowSphere } from '../components/GlowSphere.js';
import { ScaleLabel } from '../components/ScaleLabel.js';
import { mulberry32 } from '../utils/seeded.js';

interface CivilizationScaleProps {
  active: boolean;
  onEnterEntity: () => void;
  onInspect: () => void;
}

export function CivilizationScale({ active, onEnterEntity, onInspect }: CivilizationScaleProps) {
  const nodes = useMemo(() => {
    const random = mulberry32(9821);
    return Array.from({ length: 46 }, (_, index) => {
      const angle = random() * Math.PI * 2;
      const radius = 0.45 + Math.pow(random(), 0.8) * 2.25;
      return {
        id: index,
        p: [Math.cos(angle) * radius, (random() - 0.5) * 1.7, Math.sin(angle) * radius] as [number, number, number],
      };
    });
  }, []);

  const links = useMemo(() => {
    const values: number[] = [];
    nodes.forEach((node, index) => {
      const candidates = nodes
        .filter((other) => other.id !== node.id)
        .map((other) => ({ other, d: Math.hypot(node.p[0] - other.p[0], node.p[1] - other.p[1], node.p[2] - other.p[2]) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, index % 3 === 0 ? 3 : 2);
      candidates.forEach(({ other }) => values.push(...node.p, ...other.p));
    });
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(values, 3));
    return geometry;
  }, [nodes]);

  const enter = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onEnterEntity();
  };

  return (
    <group onClick={onInspect}>
      <lineSegments geometry={links}>
        <lineBasicMaterial color="#5ca5cf" transparent opacity={active ? 0.24 : 0.11} blending={AdditiveBlending} />
      </lineSegments>
      {nodes.map((node, index) => (
        <GlowSphere
          key={node.id}
          radius={index === 11 ? 0.12 : 0.045}
          color={index === 11 ? '#f1cb76' : index % 5 === 0 ? '#85d7c6' : '#8eb7df'}
          position={node.p}
          intensity={index === 11 ? 2.6 : 0.75}
          onClick={index === 11 ? enter : undefined}
        />
      ))}
      <ScaleLabel title="CIVILIZATION / SOCIAL FIELD" subtitle="individual nodes remain distinct while relations become visible" position={[0, -2.35, 0]} active={active} />
    </group>
  );
}
