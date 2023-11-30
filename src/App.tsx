import { Flex, Heading } from "@chakra-ui/react";
import { AppContainerStyle, MainContainerStyle } from "./Styles";
import { Header } from "./components/Header";
import SearchBar from "./components/SearchBar";

export default function App() {
  return (
    <Flex sx={AppContainerStyle}>
      <Header />
      <Flex sx={MainContainerStyle}>
        <Heading>DictionarySeek</Heading>
        <SearchBar />
      </Flex>
    </Flex>
  );
}
