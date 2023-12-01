import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Collapse, Flex, HStack, Icon, IconButton, Spacer, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillSound } from "react-icons/ai";
import { useAppContext } from "../utils/AppContext";
import { Meaning } from "../utils/DataTypes";
import ToggleFavoriteButton from "./ToggleFavoriteButton";

export default function DisplayResults() {
  const [showMore, setShowMore] = useState<boolean>(false);

  const { searchResult, setSearchResult, setClearSearch }= useAppContext();
  if (!searchResult) return null;

  // Ta det första fontesiska uttalet
  const firstPhonetic = searchResult.phonetics?.find((phonetic) => phonetic.text);

  return (
    <Flex p="1.5rem" shadow="md" borderWidth="1px" borderRadius="2px" maxWidth="600px" w="100%">
      <VStack align="start" spacing={2}>
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
                  >
                    Play
                  </IconButton>
                </Box>
              ) : null
            )}
          <ToggleFavoriteButton wordData={searchResult}  />
          <Spacer />
          <IconButton p="2px" icon={<CloseIcon />} aria-label="close" onClick={() => {
            setSearchResult(null)
            setClearSearch(true);
           } } />
        </HStack>
        {searchResult.meanings &&
          searchResult.meanings.map((meaning, meaningIndex) => (
            <MeaningDisplay key={meaningIndex} meaning={meaning} showMore={showMore} />
          ))}
        <Button size="sm" onClick={() => setShowMore(!showMore)} mt={2}>
          {showMore ? "See Less" : "See More"}
        </Button>
      </VStack>
    </Flex>
  );
}

interface MeaningProps {
  meaning: Partial<Meaning>;
  showMore: boolean;
}

export const MeaningDisplay: React.FC<MeaningProps> = ({ meaning, showMore }) => {
  return (
    <VStack key={meaning.partOfSpeech} align="start">
      <Text fontSize="md" fontWeight="semibold">
        {meaning.partOfSpeech?.toUpperCase()}
      </Text>
      {meaning.definitions &&
        meaning.definitions.map((definition, defIndex) => (
          <Collapse key={defIndex} in={showMore || defIndex < 2} animateOpacity>
            <Text>
              {defIndex + 1}. {definition.definition} <br />
              {definition.example && <Text as="i">Example: {definition.example}</Text>}
            </Text>
          </Collapse>
        ))}
    </VStack>
  );
};
