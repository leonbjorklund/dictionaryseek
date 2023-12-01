import { Box, Button, Collapse, HStack, Icon, IconButton, Text, VStack } from "@chakra-ui/react";
import { AiFillSound } from "react-icons/ai";

import { useState } from "react";
import { WordData } from "../utils/DataTypes";
import ToggleFavoriteButton from "./ToggleFavoriteButton";

type DisplayResultsProps = {
  searchResult: Partial<WordData> | null;
  onFavoritesUpdate: () => void;
};
export default function DisplayResults({ searchResult, onFavoritesUpdate }: DisplayResultsProps) {
  const [showMore, setShowMore] = useState<boolean>(false);

  if (!searchResult) {
    return null;
  }

  const firstPhoneticWithText = searchResult.phonetics?.find((phonetic) => phonetic.text);

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <VStack align="start" spacing={4}>
        <HStack spacing={4} align="center">
          <Text fontSize="2xl" fontWeight="bold">
            {searchResult.word}
          </Text>
          {firstPhoneticWithText && (
            <Text fontSize="md" fontWeight="semibold">
              [{firstPhoneticWithText.text}]
            </Text>
          )}
          {searchResult.phonetics &&
            searchResult.phonetics.map((phonetic, idx) =>
              phonetic.audio ? (
                <Box key={idx}>
                  <IconButton
                    bg="none"
                    size="sm"
                    icon={<Icon as={AiFillSound} boxSize="1.5rem" />}
                    aria-label="play-audio"
                    onClick={() => new Audio(phonetic.audio).play()}
                  >
                    Play
                  </IconButton>
                </Box>
              ) : null
            )}
          <ToggleFavoriteButton wordData={searchResult} onFavoritesUpdate={onFavoritesUpdate} />
        </HStack>
        {searchResult.meanings &&
          searchResult.meanings.map((meaning, meaningIndex) => (
            <VStack key={meaningIndex} align="start">
              <Text fontSize="md" fontWeight="semibold">
                {meaning.partOfSpeech?.toUpperCase()}
              </Text>
              {meaning.definitions &&
                meaning.definitions.map((definition, defIndex) => (
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
    </Box>
  );
}
