import type { Session } from "@/types/session";

export interface SpeakerSessions {
  speaker: string;
  sessions: Session[];
}

/**
 * The closing panel session uses this placeholder in place of a real
 * speaker name (it's an open Q&A with the day's speakers, not one person).
 * It must not surface as its own "speaker" card on the /speakers page.
 */
const PLACEHOLDER_SPEAKER = "Full speaker lineup";

/**
 * Groups sessions by speaker name and sorts the result alphabetically by
 * speaker. Each speaker's own sessions keep the order they appear in
 * `sessions` (already chronological, since `fetchSessions()` orders by
 * `start_time`). Sessions credited to `PLACEHOLDER_SPEAKER` (the closing
 * panel) are excluded — see its comment above.
 */
export function groupSessionsBySpeaker(sessions: Session[]): SpeakerSessions[] {
  const bySpeaker = new Map<string, Session[]>();

  for (const session of sessions) {
    if (session.speaker === PLACEHOLDER_SPEAKER) continue;

    const existing = bySpeaker.get(session.speaker);
    if (existing) {
      existing.push(session);
    } else {
      bySpeaker.set(session.speaker, [session]);
    }
  }

  return Array.from(bySpeaker, ([speaker, sessions]) => ({
    speaker,
    sessions,
  })).sort((a, b) => a.speaker.localeCompare(b.speaker));
}
