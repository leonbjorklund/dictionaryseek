import { Flex, Heading } from "@chakra-ui/react";
import { AppContainerStyle, MainContainerStyle } from "./Styles";
import DisplayResults from "./components/DisplayResults";
import { Header } from "./components/Header";
import SearchBar from "./components/SearchBar";

export default function App() {
  return (
    <Flex sx={AppContainerStyle}>
      <Header />
      <Flex as="main" sx={MainContainerStyle}>
        <Heading>DictionarySeek</Heading>
        <SearchBar />
        <DisplayResults />
      </Flex>
    </Flex>
  );
}
