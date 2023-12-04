import userEvent from "@testing-library/user-event";
import { mockWordData } from "../../utils/MockWordData";
import { render, screen } from "../../utils/test-utils";
import FavoritesMenu from "../FavoritesMenu";
import ToggleFavoriteButton from "../ToggleFavoriteButton";

describe("ToggleFavoriteButton functionality", () => {
  test("adds and removes word from favorites correctly", async () => {
    // Mocka sessionstorage
    Storage.prototype.setItem = jest.fn();

    render(
      <>
        <ToggleFavoriteButton wordData={mockWordData} />
        <FavoritesMenu />
      </>
    );

    // Klicka på add-to-favorite-knappen
    const addButton = screen.getByRole("button", { name: "add-to-favorite" });
    userEvent.click(addButton);

    // Kolla om toasten visas för att lägga till i favorites
    const addToastMessage = await screen.findByText("Word added to favorites!");
    expect(addToastMessage).toBeInTheDocument();

    const favoriteMenuItem = await screen.findByRole("menuitem", { hidden: true });
    expect(favoriteMenuItem.textContent).toBe(mockWordData.word);

    // Kolla om sessionStorage uppdaterades korrekt för att lägga till i favorites
    expect(Storage.prototype.setItem).toHaveBeenCalledWith("favorites", expect.any(String));

    // Klicka på remove-from-favorite-knappen
    const removeButton = screen.getByRole("button", { name: "remove-from-favorite" });
    userEvent.click(removeButton);

    // Kolla om toasten visas för att ta bort från favorites
    const removeToastMessage = await screen.findByText("Word removed from favorites!");

    // kolla varje menuitem att ordet togs bort
    const menuItems = screen.queryAllByRole("menuitem", { hidden: true });
    menuItems.forEach((item) => {
      expect(item.textContent).not.toBe(mockWordData.word);
    });
    expect(removeToastMessage).toBeInTheDocument();

    // Kolla om sessionStorage uppdaterades korrekt för att ta bort från favorites
    expect(Storage.prototype.setItem).toHaveBeenCalledWith("favorites", expect.any(String));
  });
});
