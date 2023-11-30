import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchBarContainerStyle, SearchBarInputStyle, SearchIconContainerStyle } from "../Styles";

export default function SearchBar() {
  return (
    <Flex sx={SearchBarContainerStyle}>
      <InputGroup>
        <InputLeftElement sx={SearchIconContainerStyle}>
          <SearchIcon boxSize="1.1rem" />
        </InputLeftElement>
        <Input sx={SearchBarInputStyle} size="lg" placeholder="Search for a word" />
      </InputGroup>
    </Flex>
  );
}
