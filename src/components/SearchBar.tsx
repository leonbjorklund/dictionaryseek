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
import { SearchResult } from "../utils/DataTypes";
import { useSearch } from "../utils/useSearch";

interface SearchBarProps {
  setSearchResult: (result: SearchResult | null) => void;
  clearSearch: boolean;
  setClearSearch: (clearSearch: boolean) => void;
}

export default function SearchBar({ setSearchResult, clearSearch }: SearchBarProps) {

  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setInputValue("");

  },[clearSearch])




  // hook för sökning
  const { loading, error, performSearch, clearError } = useSearch(setSearchResult);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    clearError(); // ta bort error vid ny input
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSearchResult(null); // återställ sökresultatet

    e.preventDefault();
    performSearch(inputValue);
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
