import { useEffect, useState } from "react";
import { WordData } from "./DataTypes";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Partial<WordData>[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  const updateFavorites = () => {
    const storedFavorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  };

  return { favorites, updateFavorites };
};
