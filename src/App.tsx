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
        {/* <Flex sx={LogoSearchBarContainerStyle}> */}
          <Heading>DictionarySeek</Heading>
          <SearchBar />
        {/* </Flex> */}
          <DisplayResults />
    </Flex>
    </Flex>
  );
}
