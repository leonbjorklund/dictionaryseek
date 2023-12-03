import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../utils/AppContext";
import FavoritesMenu from "../FavoritesMenu";
import ToggleFavoriteButton from "../ToggleFavoriteButton";

// Mocka session storage
const mockSessionStorage: Storage = (function () {
  let store: { [key: string]: string } = {};
  return {
    getItem(key: string): string | null {
      return store[key] || null;
    },
    setItem(key: string, value: string): void {
      store[key] = value.toString();
    },
    clear(): void {
      store = {};
    },
    length: 0,
    key(index: number): string | null {
      return null;
    },
    removeItem(key: string): void {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "sessionStorage", {
  value: mockSessionStorage,
});

describe("ToggleFavoriteButton and FavoritesMenu integration", () => {
  it("adds a word to sessionStorage and FavoritesMenu on click", () => {
    const wordData = { word: "testing" };

    render(
      <AppProvider>
        <ToggleFavoriteButton wordData={wordData} />
        <FavoritesMenu />
      </AppProvider>
    );

    // Klicka på knappen
    userEvent.click(screen.getByRole("button", { name: "add-to-favorite" }));

    // Kolla session storage
    expect(sessionStorage.getItem("favorites")).toContain("testing");

    // Kolla favoritesmenyn
    expect(screen.getByText("testing")).toBeInTheDocument();
  });
});
