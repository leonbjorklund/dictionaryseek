import { useState } from "react";
import { SearchResult } from "./DataTypes";

// sök-hook som sätter loading, error och searchResult
export const useSearch = (setSearchResult: (result: SearchResult | null) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const performSearch = async (inputValue: string) => {
    if (!inputValue.trim()) {
      setError("You have to have an input to search.");
      setSearchResult(null);
      return;
    }

    setLoading(true);
    setSearchResult(null);

    try {
      // fetch API:et med inputvärdet
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`);
      if (!response.ok) {
        throw new Error(`No results for "${inputValue}" found. Try another search.`);
      }
      const data = await response.json();
      const firstResult = Array.isArray(data) ? data[0] : data;
      setSearchResult(firstResult);
      return firstResult;
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError("");

  return { loading, error, performSearch, clearError };
};
