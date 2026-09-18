import type { HigherSelfState } from '../../domain/higherSelf/types.js';
import type { IncarnationState } from '../../domain/incarnation/types.js';
import { createLifeReview } from '../lifeReview/review.js';

/** The return type deliberately contains guidance only: no choice, graph, or polarity mutation. */
export function exposeGuidance(higherSelf: HigherSelfState, incarnation: IncarnationState): HigherSelfState {
  const review = createLifeReview(incarnation);
  const patterns = review.patterns.map((pattern) => `${pattern.lesson}: ${pattern.response} appears in ${pattern.eventIds.length} recorded experience${pattern.eventIds.length === 1 ? '' : 's'}.`);
  return {
    ...higherSelf,
    accumulatedLessonIds: [...new Set([...higherSelf.accumulatedLessonIds, ...review.patterns.map((pattern) => pattern.lesson)])],
    guidance: { patterns: patterns.length ? patterns : ['No catalyst response has been recorded yet. The program offers conditions; your response remains open.'], suggestedLessons: [...new Set([incarnation.program.lessonFocus, 'discernment'])], sourceClassification: 'INFERRED' },
  };
}
