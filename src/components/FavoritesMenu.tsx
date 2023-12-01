import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList, useColorModeValue } from "@chakra-ui/react";
import { WordData } from "../utils/DataTypes";

interface FavoritesMenuProps {
  favorites: Partial<WordData>[];
  onWordSelect: (wordData: Partial<WordData>) => void;
}

export default function FavoritesMenu({ favorites, onWordSelect }: FavoritesMenuProps) {
  const menuItemBg = useColorModeValue("gray.100", "#2C313D");
  const menuItemHoverBg = useColorModeValue("gray.200", "#3F444E");
  const menuItemColor = useColorModeValue("gray.900", "white");

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton isActive={isOpen} as={Button} rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}>
            Favorited
          </MenuButton>
          <MenuList p="0">
            {favorites.length === 0 ? (
              <MenuItem borderRadius="5px" bg={menuItemBg} color={menuItemColor}>
                No favorites yet!
              </MenuItem>
            ) : (
              favorites.map((wordData, index) => (
                <MenuItem
                  key={index}
                  borderRadius={index === 0 ? "5px 5px 0 0" : index === favorites.length - 1 ? "0 0 5px 5px" : "0"}
                  bg={menuItemBg}
                  color={menuItemColor}
                  _hover={{ bg: menuItemHoverBg }}
                  onClick={() => onWordSelect(wordData)}
                >
                  {wordData.word}
                </MenuItem>
              ))
            )}
          </MenuList>
        </>
      )}
    </Menu>
  );
}
