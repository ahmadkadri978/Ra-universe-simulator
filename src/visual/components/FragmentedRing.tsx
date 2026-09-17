import { useMemo } from 'react';
import { AdditiveBlending, BufferGeometry, Float32BufferAttribute } from 'three';

interface FragmentedRingProps {
  radius: number;
  color: string;
  segments?: number;
  gapRatio?: number;
  opacity?: number;
  rotation?: [number, number, number];
}

export function FragmentedRing({
  radius,
  color,
  segments = 18,
  gapRatio = 0.32,
  opacity = 0.32,
  rotation = [Math.PI / 2, 0, 0],
}: FragmentedRingProps) {
  const geometry = useMemo(() => {
    const values: number[] = [];
    const arc = (Math.PI * 2) / segments;
    for (let index = 0; index < segments; index += 1) {
      const start = index * arc + arc * gapRatio * 0.5;
      const end = (index + 1) * arc - arc * gapRatio * 0.5;
      const slices = 4;
      for (let slice = 0; slice < slices; slice += 1) {
        const a = start + ((end - start) * slice) / slices;
        const b = start + ((end - start) * (slice + 1)) / slices;
        values.push(Math.cos(a) * radius, Math.sin(a) * radius, 0);
        values.push(Math.cos(b) * radius, Math.sin(b) * radius, 0);
      }
    }
    const result = new BufferGeometry();
    result.setAttribute('position', new Float32BufferAttribute(values, 3));
    return result;
  }, [gapRatio, radius, segments]);

  return (
    <lineSegments geometry={geometry} rotation={rotation}>
      <lineBasicMaterial color={color} transparent opacity={opacity} blending={AdditiveBlending} />
    </lineSegments>
  );
}
