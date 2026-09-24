import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./group-sessions-by-speaker";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("groups sessions under their speaker, sorted alphabetically by speaker", () => {
    const grouped = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Zoe" }),
      session({ id: "s2", speaker: "Amy" }),
      session({ id: "s3", speaker: "Zoe" }),
    ]);

    expect(grouped).toEqual([
      { speaker: "Amy", sessions: [expect.objectContaining({ id: "s2" })] },
      {
        speaker: "Zoe",
        sessions: [
          expect.objectContaining({ id: "s1" }),
          expect.objectContaining({ id: "s3" }),
        ],
      },
    ]);
  });

  it("keeps a speaker's own sessions in the order they were given", () => {
    const grouped = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Amy", startTime: "09:00" }),
      session({ id: "s2", speaker: "Amy", startTime: "14:00" }),
    ]);

    expect(grouped[0].sessions.map((s) => s.id)).toEqual(["s1", "s2"]);
  });

  it("excludes the closing panel's 'Full speaker lineup' placeholder", () => {
    const grouped = groupSessionsBySpeaker([
      session({ id: "closing-panel", speaker: "Full speaker lineup" }),
      session({ id: "s1", speaker: "Amy" }),
    ]);

    expect(grouped).toEqual([
      { speaker: "Amy", sessions: [expect.objectContaining({ id: "s1" })] },
    ]);
  });

  it("returns nothing for no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
