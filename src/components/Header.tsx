import { Flex, Spacer } from "@chakra-ui/react";
import { HeaderContainerStyle } from "../Styles";
import { WordData } from "../utils/DataTypes";
import { DarkLightModeButton } from "./DarkLightModeButton";
import FavoritesMenu from "./FavoritesMenu";

interface HeaderProps {
  favorites: Partial<WordData>[];
  handleWordSelect: (wordData: Partial<WordData>) => void;
}
export function Header({ favorites, handleWordSelect }: HeaderProps) {
  return (
    <Flex as="header" sx={HeaderContainerStyle}>
      <Spacer />
      <FavoritesMenu favorites={favorites} onWordSelect={handleWordSelect} />
      <DarkLightModeButton />
    </Flex>
  );
}
