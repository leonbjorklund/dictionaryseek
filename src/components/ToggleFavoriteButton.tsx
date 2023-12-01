import { Icon, IconButton, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WordData } from "../utils/DataTypes";

type ToggleFavoriteButtonProps = {
  wordData: Partial<WordData>;
  onFavoritesUpdate: () => void;
};

export default function ToggleFavoriteButton({ wordData, onFavoritesUpdate }: ToggleFavoriteButtonProps) {
  const toast = useToast();
  const [isFavorited, setIsFavorited] = useState(false);

  // Kolla om ordet finns i favorites vid mount
  useEffect(() => {
    const favorites: Partial<WordData>[] = JSON.parse(sessionStorage.getItem("favorites") || "[]");
    setIsFavorited(favorites.some((fav) => fav.word === wordData.word));
  }, [wordData.word]);

  const handleFavoriteClick = () => {
    let favorites: Partial<WordData>[] = JSON.parse(sessionStorage.getItem("favorites") || "[]");
    const index = favorites.findIndex((fav) => fav.word === wordData.word);

    let toastTitle = "";
    if (index === -1) {
      // Lägg till i favorites
      favorites.push(wordData);
      toastTitle = "Word added to favorites!";
      setIsFavorited(true);
    } else {
      // Ta bort från favorites
      favorites.splice(index, 1);
      toastTitle = "Word removed from favorites!";
      setIsFavorited(false);
    }

    sessionStorage.setItem("favorites", JSON.stringify(favorites));

    // Uppdatera favorites i parent-App.tsx
    onFavoritesUpdate();

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
