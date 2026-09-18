import type { PossibilityGraph, PossibilityNode } from '../../domain/possibility/types.js';
import type { LessonId, ResponseId } from '../../domain/incarnation/program.js';

export const boundVisualWeight = (value: number): number => Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
const labels = { accept: 'Engage with openness', control: 'Organize through control', defer: 'Leave the response open' };
export function createPossibilityGraph(entityId: string, decisionId: string, lesson: LessonId = 'acceptance'): PossibilityGraph {
  return {
    entityId, decisionId, revision: 0, sourceClassification: 'SIMULATION_ABSTRACTION',
    nodes: (['accept', 'control', 'defer'] as const).map((response, index) => ({
      id: `${decisionId}-${response}`, label: labels[response], sourceClassification: 'SIMULATION_ABSTRACTION',
      visualWeight: 0.48 + index * 0.06, status: 'OPEN', relatedLessons: [lesson], relatedCatalyst: [decisionId],
      energyCenterTendencies: response === 'control' ? ['yellow'] : response === 'accept' ? ['green', 'blue'] : ['orange'],
      childPossibilities: [], responseAffinity: response, parentId: null,
    })),
  };
}

/** Deterministic illustration of branching, never a selector or a forecast. */
export function evolvePossibilities(graph: PossibilityGraph, response: ResponseId, catalystId: string, lesson: LessonId): PossibilityGraph {
  const revision = graph.revision + 1;
  const nodes: PossibilityNode[] = graph.nodes.map((node) => {
    if (node.status === 'CLOSED') return node;
    const aligned = node.responseAffinity === response;
    // A prior invitation to defer closes once a response has been made. The ability to defer later remains open.
    const close = node.responseAffinity === 'defer' && response !== 'defer' && node.parentId === null;
    return {
      ...node, status: close ? 'CLOSED' : aligned ? 'STRENGTHENED' : 'WEAKENED',
      visualWeight: close ? 0 : boundVisualWeight(node.visualWeight + (aligned ? 0.18 : -0.12)),
    };
  });
  const parent = nodes.find((node) => node.responseAffinity === response && node.status !== 'CLOSED');
  const emerging: PossibilityNode = {
    id: `${graph.decisionId}-emergent-${revision}`, label: response === 'accept' ? 'Connection with new boundaries' : response === 'control' ? 'Reconsider the need for control' : 'Return with a different perspective',
    sourceClassification: 'SIMULATION_ABSTRACTION', visualWeight: 0.42, status: 'EMERGENT', relatedLessons: [lesson],
    relatedCatalyst: [catalystId], energyCenterTendencies: ['green', 'blue'], childPossibilities: [],
    responseAffinity: null, parentId: parent?.id ?? null,
  };
  const withChild = nodes.map((node) => node.id === parent?.id ? { ...node, childPossibilities: [...node.childPossibilities, emerging.id] } : node);
  return { ...graph, revision, nodes: [...withChild, emerging] };
}
