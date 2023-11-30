import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList, useColorModeValue } from "@chakra-ui/react";

export default function FavoritesMenu() {
  // Define colors for light mode
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
            <MenuItem borderRadius="5px 5px 0 0" bg={menuItemBg} color={menuItemColor} _hover={{ bg: menuItemHoverBg }}>
              Item 1
            </MenuItem>
            <MenuItem borderRadius="0 0 5px 5px" bg={menuItemBg} color={menuItemColor} _hover={{ bg: menuItemHoverBg }}>
              Item 2
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}
