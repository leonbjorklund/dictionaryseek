import { Box, Button, Collapse, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { SearchResult } from "../ResponseDataType";

type DisplayResultsProps = {
  searchResults: SearchResult | null;
};

export default function DisplayResults({ searchResults }: DisplayResultsProps) {
  // State to manage the visibility of additional definitions for each part of speech
  const [showMore, setShowMore] = useState<boolean>(false);

  if (!searchResults) {
    return null;
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      {searchResults.map((result, index) => (
        <VStack key={index} align="start" spacing={4}>
          <HStack key={index} spacing={4} align="center">
            <Text fontSize="xl" fontWeight="bold">
              {result.word}
            </Text>
            {result.phonetic && (
              <Text fontSize="md" fontWeight="semibold">
                [{result.phonetic}]
              </Text>
            )}
            {result.phonetics.map((phonetic, idx) =>
              phonetic.audio ? (
                <Box key={idx}>
                  <Button
                    onClick={() => new Audio(phonetic.audio).play()}
                    // leftIcon={<Audio />}

                    size="sm"
                  >
                    Play
                  </Button>
                </Box>
              ) : null
            )}
          </HStack>
          {/* Group definitions by part of speech */}
          {result.meanings.map((meaning, meaningIndex) => (
            <VStack key={meaningIndex} align="start">
              <Text fontSize="md" fontWeight="semibold">
                {meaning.partOfSpeech.toUpperCase()}
              </Text>
              {meaning.definitions.map((definition, defIndex) => (
                <Collapse key={defIndex} in={showMore || defIndex === 0} animateOpacity>
                  <Text>
                    {defIndex + 1}. {definition.definition}
                    {definition.example && <Text as="i">e.g., {definition.example}</Text>}
                  </Text>
                </Collapse>
              ))}
            </VStack>
          ))}
          <Button size="sm" onClick={() => setShowMore(!showMore)} mt={2}>
            {showMore ? "See Less" : "See More"}
          </Button>
        </VStack>
      ))}
    </Box>
  );
}
