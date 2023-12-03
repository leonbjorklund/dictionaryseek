import { SearchIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  SearchBarContainerStyle,
  SearchBarInputStyle,
  SearchErrorTextStyle,
  SearchIconContainerStyle,
  SubmitSearchButtonContainerStyle,
} from "../Styles";
import { useAppContext } from "../utils/AppContext";
import { useSearch } from "../utils/useSearch";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const { clearSearch, setClearSearch, setSearchResult } = useAppContext();
  const { loading, error, performSearch, clearError } = useSearch(setSearchResult);

  // rensa sökfält när man stänger ner resultatet
  useEffect(() => {
    setInputValue("");
    setClearSearch(false);
  }, [clearSearch, setClearSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    clearError(); // Ta bort error om användaren inputtar något
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    performSearch(inputValue);
  };

  return (
    <Flex data-testid="searchbar" sx={SearchBarContainerStyle} position="relative">
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
