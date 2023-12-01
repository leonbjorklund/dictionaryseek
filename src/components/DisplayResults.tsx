import { Box, Button, Collapse, HStack, Icon, IconButton, Spacer, Text, VStack } from "@chakra-ui/react";
import { AiFillSound } from "react-icons/ai";

import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Meaning, SearchResult, WordData } from "../utils/DataTypes";
import ToggleFavoriteButton from "./ToggleFavoriteButton";

interface DisplayResultsProps {
  searchResult: Partial<WordData> | null;
  setSearchResult: (result: SearchResult | null) => void;
  setClearSearch: (clearSearch: boolean) => void;
  onFavoritesUpdate: () => void;
}
export default function DisplayResults({ searchResult, setSearchResult, onFavoritesUpdate, setClearSearch }: DisplayResultsProps) {
  const [showMore, setShowMore] = useState<boolean>(false);

  if (!searchResult) return null;

  // Ta det första fontesiska uttalet
  const firstPhoneticWithText = searchResult.phonetics?.find((phonetic) => phonetic.text);

  return (
    <Box p={5} shadow="md" borderWidth="1px" maxWidth="600px" w="100%">
      <VStack align="start" spacing={4}>
        <HStack spacing={4} align="center" w="100%">
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
          {/* Passera lyssnare favorite updates så toggle-favorite kan ge favoriten till FavoritesMenu */}
          <ToggleFavoriteButton wordData={searchResult} onFavoritesUpdate={onFavoritesUpdate} />
          <Spacer />
          <IconButton icon={<CloseIcon />} aria-label="close" onClick={() => {
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
    </Box>
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
