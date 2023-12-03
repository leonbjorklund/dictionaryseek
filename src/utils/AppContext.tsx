import { ReactNode, createContext, useContext, useState } from "react";
import { SearchResult, WordData } from "./DataTypes";
import { useFavorites } from "./useFavorites";

interface AppContextType {
  clearSearch: boolean;
  setClearSearch: (value: boolean) => void;
  searchResult: SearchResult | null;
  setSearchResult: (result: SearchResult | null) => void;
  favorites: Partial<WordData>[];
  setFavorites: (favorites: Partial<WordData>[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [clearSearch, setClearSearch] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const { favorites, setFavorites } = useFavorites();

  return (
    <AppContext.Provider
      value={{ clearSearch, setClearSearch, searchResult, setSearchResult, favorites, setFavorites }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
