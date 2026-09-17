import { useMemo } from 'react';
import { Color } from 'three';
import { FlowingArc } from '../components/FlowingArc.js';
import { universeScales } from '../navigation/universeGraph.js';

export function UniverseSpine() {
  const arcs = useMemo(
    () => universeScales.slice(0, -1).map((scale, index) => {
      const next = universeScales[index + 1];
      if (!next) return null;
      const a = scale.anchor;
      const b = next.anchor;
      const midpoint: [number, number, number] = [
        (a[0] + b[0]) / 2 + Math.sin(index * 1.7) * 0.7,
        (a[1] + b[1]) / 2 + (index % 2 === 0 ? 0.8 : -0.55),
        (a[2] + b[2]) / 2,
      ];
      const blend = new Color('#4f83c4').lerp(new Color('#d6b45f'), index / universeScales.length);
      return {
        id: `${scale.id}-${next.id}`,
        points: [a, midpoint, b],
        color: `#${blend.getHexString()}`,
        speed: 0.035 + index * 0.006,
      };
    }).filter((value) => value !== null),
    [],
  );

  return (
    <group>
      {arcs.map((arc) => (
        <FlowingArc
          key={arc.id}
          points={arc.points}
          color={arc.color}
          radius={0.008}
          opacity={0.12}
          speed={arc.speed}
          particleSize={0.035}
        />
      ))}
    </group>
  );
}
