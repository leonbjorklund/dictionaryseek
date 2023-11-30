import { SearchIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import { SearchBarContainerStyle, SearchBarInputStyle, SearchIconContainerStyle } from "../Styles";

interface SearchBarProps {
  setSearchResults: (results: any) => void;
}

export default function SearchBar({ setSearchResults }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the input is empty
    if (!inputValue.trim()) {
      setError("You have to input a search term before searching.");
      setSearchResults(null);
      return;
    }

    setLoading(true);
    setSearchResults(null); // Reset search results on new submission
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`);
      if (!response.ok) {
        throw new Error(`No results for "${inputValue}" found. Try another search.`);
      }
      const data = await response.json();
      setSearchResults(data);
      console.log("data", data);
      setError("");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex sx={SearchBarContainerStyle}>
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
          <InputRightElement w="auto" h="100%" p="1px">
            <Button h="100%" type="submit" isLoading={loading}>
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
      <Flex flexDirection="column" mt="2" width="100%">
        {error && <Text color="red.500">{error}</Text>}
      </Flex>
    </Flex>
  );
}
