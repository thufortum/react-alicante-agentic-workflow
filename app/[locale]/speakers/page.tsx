import { SpeakerCard } from "@/components/molecules/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/group-sessions-by-speaker";
import { Box, Flex, Grid } from "@chakra-ui/react";

export default async function SpeakersPage() {
  const sessions = await fetchSessions();
  const speakers = groupSessionsBySpeaker(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title="Speakers">
        Every speaker at React Alicante, and the session(s) they give.
      </PageHeading>
      <Grid
        as="ul"
        role="list"
        listStyleType="none"
        margin="0"
        padding="0"
        gap="4"
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
      >
        {speakers.map((speakerSessions) => (
          <Box as="li" key={speakerSessions.speaker}>
            <SpeakerCard speakerSessions={speakerSessions} />
          </Box>
        ))}
      </Grid>
    </Flex>
  );
}
