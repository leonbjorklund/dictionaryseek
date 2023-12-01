import { Icon, IconButton, useToast } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAppContext } from "../utils/AppContext";
import { WordData } from "../utils/DataTypes";

type ToggleFavoriteButtonProps = {
  wordData: Partial<WordData>;
};

export default function ToggleFavoriteButton({ wordData }: ToggleFavoriteButtonProps) {
  const toast = useToast();
  const { favorites, setFavorites } = useAppContext();

  // Kolla om ordet redan finns i favorites
  const isFavorited = favorites.some((fav) => fav.word === wordData.word);

  const handleFavoriteClick = () => {
    let toastTitle = "";
    let updatedFavorites;

    // Toggla av och på favorites
    if (isFavorited) {
      updatedFavorites = favorites.filter((fav) => fav.word !== wordData.word);
      toastTitle = "Word removed from favorites!";
    } else {
      updatedFavorites = [...favorites, wordData];
      toastTitle = "Word added to favorites!";
    }

    setFavorites(updatedFavorites); // Uppdatera favorites

    toast({
      title: toastTitle,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <IconButton
      bg="none"
      aria-label={isFavorited ? "remove-from-favorite" : "add-to-favorite"}
      size="sm"
      icon={<Icon as={isFavorited ? FaHeart : FaRegHeart} boxSize="1.3rem" />}
      onClick={handleFavoriteClick}
    />
  );
}
