import { useState } from "react";
import { SearchResult } from "./DataTypes";

export const useSearch = (setSearchResult: (result: SearchResult | null) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const performSearch = async (inputValue: string) => {
    if (!inputValue.trim()) {
      setError("You have to have an input to search");
      return;
    }

    setLoading(true);
    setError("");
    setSearchResult(null); // återställ sökresultatet

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`);
      if (!response.ok) {
        throw new Error(`No results for "${inputValue}" found. Try another search.`);
      }
      const data = await response.json();
      // ta första resultatet om det är en array, annars ta det enda objektet
      const firstResult = Array.isArray(data) ? data[0] : data;
      setSearchResult(firstResult);
      console.log(firstResult);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError("");
  };

  return { loading, error, performSearch, clearError };
};
