import { SearchIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  SearchBarContainerStyle,
  SearchBarInputStyle,
  SearchErrorTextStyle,
  SearchIconContainerStyle,
  SubmitSearchButtonContainerStyle,
} from "../Styles";
import { SearchResult } from "../utils/DataTypes";

interface SearchBarProps {
  setSearchResult: (results: SearchResult | null) => void;
}

export default function SearchBar({ setSearchResult }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Kolla om input saknas
    if (!inputValue.trim()) {
      setError("You have to input a search term before searching.");
      setSearchResult(null);
      return;
    }

    setLoading(true);
    setSearchResult(null); // Töm sökresultatet vid ny sökning
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`);
      if (!response.ok) {
        throw new Error(`No results for "${inputValue}" found. Try another search.`);
      }
      const data = await response.json();
      // Only use the first object in the response array
      const firstResult = Array.isArray(data) ? data[0] : data;
      setSearchResult(firstResult);
      console.log("data", firstResult);
      setError("");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex sx={SearchBarContainerStyle} position="relative">
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <InputGroup>
          <InputLeftElement sx={SearchIconContainerStyle}>
            <SearchIcon boxSize="1.1rem" />
          </InputLeftElement>
          <Input
            sx={SearchBarInputStyle}
            size="lg"
            placeholder="Search for a word"
            onChange={handleInputChange}
            value={inputValue}
          />
          <InputRightElement sx={SubmitSearchButtonContainerStyle}>
            <Button h="100%" type="submit" isLoading={loading}>
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
      {error && <Text sx={SearchErrorTextStyle}>{error}</Text>}
    </Flex>
  );
}
