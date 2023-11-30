import { Flex, Spacer } from "@chakra-ui/react";
import { HeaderContainerStyle } from "../Styles";
import { DarkLightModeButton } from "./DarkLightModeButton";
import FavoritesMenu from "./FavoritesMenu";

export function Header() {
  return (
    <Flex as="header" sx={HeaderContainerStyle}>
      <Spacer />
      <FavoritesMenu />
      <DarkLightModeButton />
    </Flex>
  );
}
