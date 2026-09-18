import type { IncarnationState } from '../../domain/incarnation/types.js';
import type { LifeReview } from '../../domain/timeSpace/types.js';

export function createLifeReview(incarnation: IncarnationState): LifeReview {
  const events = incarnation.events.filter((event) => event.kind === 'CATALYST');
  const groups = new Map<string, string[]>();
  for (const event of events) {
    const key = `${event.catalyst?.lesson ?? 'experience'}|${event.choice?.response ?? 'unanswered'}`;
    groups.set(key, [...(groups.get(key) ?? []), event.id]);
  }
  return {
    entityId: incarnation.entityId, incarnationId: incarnation.id, eventIds: incarnation.events.map((event) => event.id),
    patterns: [...groups].map(([key, eventIds]) => ({ lesson: key.split('|')[0] ?? '', response: key.split('|')[1] ?? '', eventIds })),
    // Integration is a user-marked review activity, not a computed moral outcome.
    unresolvedEventIds: events.map((event) => event.id), integratedEventIds: [], sourceClassification: 'SIMULATION_ABSTRACTION',
  };
}
export function integrateEvent(review: LifeReview, eventId: string): LifeReview {
  if (!review.unresolvedEventIds.includes(eventId)) return review;
  return { ...review, unresolvedEventIds: review.unresolvedEventIds.filter((id) => id !== eventId), integratedEventIds: [...review.integratedEventIds, eventId] };
}
