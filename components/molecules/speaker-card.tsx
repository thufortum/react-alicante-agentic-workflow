import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { SpeakerSessions } from "@/utils/group-sessions-by-speaker";
import { Flex, Text } from "@chakra-ui/react";

interface SpeakerCardProps {
  speakerSessions: SpeakerSessions;
}

export function SpeakerCard({ speakerSessions }: SpeakerCardProps) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle as="h2" fontSize="md">
          {speakerSessions.speaker}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="2">
          {speakerSessions.sessions.map((session) => (
            <Link
              key={session.id}
              href={`/sessions/${session.id}`}
              aria-label={`${session.title}, starts at ${session.startTime}`}
            >
              <Flex
                justify="space-between"
                gap="3"
                paddingY="1"
                textDecoration="underline"
                textDecorationColor="var(--card-border-hex)"
                transition="color 0.2s"
                _hover={{ color: "var(--accent-hex)" }}
              >
                <Text fontSize="sm">{session.title}</Text>
                <Text
                  as="time"
                  fontSize="sm"
                  color="var(--text-muted)"
                  flexShrink="0"
                >
                  {session.startTime}
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
