import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AppContainerStyle, MainContainerStyle } from "./Styles";
import DisplayResults from "./components/DisplayResults";
import { Header } from "./components/Header";
import SearchBar from "./components/SearchBar";
import { SearchResult, WordData } from "./utils/DataTypes";

export default function App() {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [favorites, setFavorites] = useState<Partial<WordData>[]>([]);

  useEffect(() => {
    // Load favorites from sessionStorage on component mount
    const storedFavorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  const handleWordSelect = (wordData: Partial<WordData>) => {
    setSearchResult(wordData);
  };

  const updateFavorites = () => {
    const storedFavorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  };

  return (
    <Flex sx={AppContainerStyle}>
      <Header favorites={favorites} handleWordSelect={handleWordSelect} />
      <Flex sx={MainContainerStyle}>
        <Heading>DictionarySeek</Heading>
        <SearchBar setSearchResult={setSearchResult} />
        <DisplayResults searchResult={searchResult} onFavoritesUpdate={updateFavorites} />
      </Flex>
    </Flex>
  );
}
