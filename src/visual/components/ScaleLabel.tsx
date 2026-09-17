import { Html } from '@react-three/drei';

interface ScaleLabelProps {
  title: string;
  subtitle?: string;
  position?: [number, number, number];
  active?: boolean;
}

export function ScaleLabel({ title, subtitle, position = [0, 0, 0], active = false }: ScaleLabelProps) {
  if (!active) return null;
  return (
    <Html center position={position} transform distanceFactor={9} style={{ pointerEvents: 'none' }}>
      <div className={`world-label ${active ? 'active' : ''}`}>
        <strong>{title}</strong>
        {subtitle ? <span>{subtitle}</span> : null}
      </div>
    </Html>
  );
}
