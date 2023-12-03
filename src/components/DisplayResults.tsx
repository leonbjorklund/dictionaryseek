import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Collapse, Flex, HStack, Icon, IconButton, Spacer, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillSound } from "react-icons/ai";
import { DisplayResultContainerStyle } from "../Styles";
import { useAppContext } from "../utils/AppContext";
import { Meaning } from "../utils/DataTypes";
import ToggleFavoriteButton from "./ToggleFavoriteButton";

export default function DisplayResults() {
  const [showMoreStates, setShowMoreStates] = useState<{ [key: number]: boolean }>({});
  const { searchResult, setSearchResult, setClearSearch } = useAppContext();

  if (!searchResult) return null;

  // ta första fonetiska uttalet
  const firstPhonetic = searchResult.phonetics?.find((phonetic) => phonetic.text);

  // visa mer/visa mindre
  const toggleShowMore = (index: number) => {
    setShowMoreStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Flex sx={DisplayResultContainerStyle}>
      <VStack w="100%" align="start" spacing={2}>
        <HStack spacing={4} align="center" w="100%">
          <Text fontSize="2xl" fontWeight="bold">
            {searchResult.word}
          </Text>
          {firstPhonetic && (
            <Text fontSize="md" fontWeight="semibold">
              [{firstPhonetic.text}]
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
                  />
                </Box>
              ) : null
            )}
          <ToggleFavoriteButton wordData={searchResult} />
          <Spacer />
          <IconButton
            p="2px"
            icon={<CloseIcon />}
            aria-label="close"
            onClick={() => {
              setSearchResult(null);
              setClearSearch(true);
            }}
          />
        </HStack>
        {/* visa alla betydelser */}
        {searchResult.meanings &&
          searchResult.meanings.map((meaning, meaningIndex) => (
            <MeaningDisplay
              key={meaningIndex}
              meaning={meaning}
              showMore={showMoreStates[meaningIndex] || false}
              onToggleShowMore={() => toggleShowMore(meaningIndex)}
            />
          ))}
      </VStack>
    </Flex>
  );
}

interface MeaningProps {
  meaning: Partial<Meaning>;
  showMore: boolean;
  onToggleShowMore: () => void;
}

// memo används för att undvika att rendera om komponenten i onödan
export const MeaningDisplay = React.memo(({ meaning, showMore, onToggleShowMore }: MeaningProps) => {
  return (
    <VStack align="start" spacing={2}>
      <Text fontSize="md" fontWeight="semibold">
        {meaning.partOfSpeech?.toUpperCase()}
      </Text>
      {meaning.definitions &&
        meaning.definitions.map((definition, defIndex) => (
          <Collapse key={defIndex} in={showMore || defIndex < 2} animateOpacity>
            <Text>
              {defIndex + 1}. {definition.definition}
              <br />
              {definition.example && <Text as="i">Example: {definition.example}</Text>}
            </Text>
          </Collapse>
        ))}
      {meaning.definitions && meaning.definitions.length > 2 && (
        <Button size="sm" onClick={onToggleShowMore} mt={2}>
          {showMore ? "See Less" : "See More"}
        </Button>
      )}
    </VStack>
  );
});
