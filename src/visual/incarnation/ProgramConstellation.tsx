import { Html } from '@react-three/drei';
import { programFields } from '../../domain/incarnation/program.js';
import type { IncarnationProgram } from '../../domain/incarnation/program.js';
import { BranchSpline } from '../possibility/BranchSpline.js';

export function ProgramConstellation({ program }: { program: IncarnationProgram }) {
  return <group userData={{ sourceClassification: 'SIMULATION_ABSTRACTION', conceptId: 'program_conditions' }}>
    {programFields.map((field, i) => {
      const selection = field.options.findIndex((option) => option.value === program[field.key]);
      const y = 2.4 - i * 0.76; const x = -3.9 + selection * 0.28;
      return <group key={field.key}>
        <mesh position={[x, y, 0]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[0.10, 0.10, 0.10]} /><meshBasicMaterial color="#cfb68a" /></mesh>
        <BranchSpline points={[[x + 0.2, y, 0], [-1.4, y * 0.8, -0.3], [0.7, 0, 0]]} color="#bba987" opacity={0.3} animated={false} />
        <Html position={[x - 0.15, y + 0.2, 0]} style={{ pointerEvents: 'none' }}><span className="program-world-label">{field.label}</span></Html>
      </group>;
    })}
    <Html position={[2.6, -2.7, 0]} center style={{ pointerEvents: 'none' }}><span className="open-response-label">RESPONSE <b>OPEN</b></span></Html>
  </group>;
}
