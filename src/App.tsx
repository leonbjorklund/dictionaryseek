import { Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { SearchResult } from "./ResponseDataType";
import { AppContainerStyle, MainContainerStyle } from "./Styles";
import DisplayResults from "./components/DisplayResults";
import { Header } from "./components/Header";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);

  return (
    <Flex sx={AppContainerStyle}>
      <Header />
      <Flex sx={MainContainerStyle}>
        <Heading>DictionarySeek</Heading>
        <SearchBar setSearchResults={setSearchResults} />
        <DisplayResults searchResults={searchResults} />
      </Flex>
    </Flex>
  );
}
