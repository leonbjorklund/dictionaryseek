import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../utils/AppContext";
import DisplayResults from "../DisplayResults";
import SearchBar from "../SearchBar";

describe("Search functionality", () => {
  test('displays correct results for "hello"', async () => {
    render(
      <AppProvider>
        <SearchBar />
        <DisplayResults />
      </AppProvider>
    );

    userEvent.type(screen.getByPlaceholderText("Search for a word"), "hello");
    userEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(screen.getByText("hello")).toBeInTheDocument();
    });
  });
});
