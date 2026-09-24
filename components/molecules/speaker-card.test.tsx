import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { SpeakerSessions } from "@/utils/group-sessions-by-speaker";

import { SpeakerCard } from "./speaker-card";

function speakerSessions(
  overrides: Partial<SpeakerSessions> = {},
): SpeakerSessions {
  return {
    speaker: "Amy",
    sessions: [
      {
        id: "a-session",
        title: "A session",
        speaker: "Amy",
        track: "React",
        room: "Main Hall",
        startTime: "09:00",
        durationMinutes: 45,
        description: "",
      },
    ],
    ...overrides,
  };
}

describe("SpeakerCard", () => {
  it("renders the speaker's name and each of their sessions", () => {
    render(
      <SpeakerCard
        speakerSessions={speakerSessions({
          speaker: "Amy",
          sessions: [
            {
              id: "s1",
              title: "Opening Keynote",
              speaker: "Amy",
              track: "React",
              room: "Main Hall",
              startTime: "09:00",
              durationMinutes: 45,
              description: "",
            },
            {
              id: "s2",
              title: "Testing AI-Generated Code",
              speaker: "Amy",
              track: "React",
              room: "Room B",
              startTime: "11:00",
              durationMinutes: 30,
              description: "",
            },
          ],
        })}
      />,
    );

    expect(screen.getByText("Amy")).toBeInTheDocument();
    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("Testing AI-Generated Code")).toBeInTheDocument();
    expect(screen.getByText("11:00")).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    render(<SpeakerCard speakerSessions={speakerSessions()} />);

    expect(screen.getByRole("link", { name: /A session/ })).toHaveAttribute(
      "href",
      "/en/sessions/a-session",
    );
  });
});
