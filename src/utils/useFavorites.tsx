import { useEffect, useState } from "react";
import { WordData } from "./DataTypes";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Partial<WordData>[]>(() => {
    // Initiera favorites från sessionStorage
    const storedFavorites = sessionStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    // Updatera sessionStorage när favorites uppdateras
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return { favorites, setFavorites };
};