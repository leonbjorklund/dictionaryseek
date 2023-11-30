import { Box, Button, Collapse, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { SearchResult } from "../ResponseDataType";

// Update the type to allow for null
type DisplayResultsProps = {
  searchResults: SearchResult | null;
};

export default function DisplayResults({ searchResults }: DisplayResultsProps) {
  const [showMore, setShowMore] = useState(false);

  if (!searchResults) {
    // Only show this message if a search has been attempted
    return null;
  }

  return (
    <VStack align="start" spacing={4}>
      {searchResults.map((result, index) => (
        <Box key={index} p={5} shadow="md" borderWidth="1px">
          <Text fontSize="xl" fontWeight="bold">
            {result.word}
          </Text>
          {result.phonetics && result.phonetics[0] && <Text>Phonetic: {result.phonetics[0].text}</Text>}
          {result.meanings.map((meaning, meaningIndex) => (
            <VStack key={meaningIndex} align="start" pt={2}>
              <Text fontSize="md" fontWeight="semibold">
                {meaning.partOfSpeech}
              </Text>
              {meaning.definitions.map((definition, defIndex) => (
                <Box key={defIndex}>
                  {defIndex === 0 ? (
                    // Display first definition and example
                    <Box>
                      <Text>1. {definition.definition}</Text>
                      {definition.example && <Text>Example: {definition.example}</Text>}
                    </Box>
                  ) : (
                    // Remaining definitions in a Collapse component
                    <Collapse in={showMore} animateOpacity>
                      {showMore && (
                        <Box pt={2}>
                          <Text>
                            {defIndex + 1}. {definition.definition}
                          </Text>
                          {definition.example && <Text>Example: {definition.example}</Text>}
                        </Box>
                      )}
                    </Collapse>
                  )}
                </Box>
              ))}
              {meaning.definitions.length > 1 && (
                <Button size="sm" onClick={() => setShowMore(!showMore)} mt={2}>
                  {showMore ? "See Less" : "See More"}
                </Button>
              )}
            </VStack>
          ))}
        </Box>
      ))}
    </VStack>
  );
}
