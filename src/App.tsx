import { Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { AppContainerStyle, MainContainerStyle } from "./Styles";
import DisplayResults from "./components/DisplayResults";
import { Header } from "./components/Header";
import SearchBar from "./components/SearchBar";
import { SearchResult, WordData } from "./utils/DataTypes";
import { useFavorites } from "./utils/useFavorites";

export default function App() {
  // parent håller state för sökresultat och favoriter
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [clearSearch, setClearSearch] = useState<boolean>(false);
  const { favorites, updateFavorites } = useFavorites();

  const handleWordSelect = (wordData: Partial<WordData>) => {
    setSearchResult(wordData);
  };

  return (
    <Flex sx={AppContainerStyle}>
      <Header favorites={favorites} handleWordSelect={handleWordSelect} />
      <Flex as="main" sx={MainContainerStyle}>
        <Heading>DictionarySeek</Heading>
        <SearchBar setSearchResult={setSearchResult} clearSearch={clearSearch} setClearSearch={setClearSearch} />
        <DisplayResults searchResult={searchResult} setSearchResult={setSearchResult} setClearSearch={setClearSearch} onFavoritesUpdate={updateFavorites} />
      </Flex>
    </Flex>
  );
}
