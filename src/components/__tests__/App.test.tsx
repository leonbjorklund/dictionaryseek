import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import App from "../../App";
import { AppProvider } from "../../utils/AppContext";

// basic test för att kolla att appen renderas med alla västenliga element
describe("App Component", () => {
  test("renders with essential elements", () => {
    render(
      <React.StrictMode>
        <ChakraProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </ChakraProvider>
      </React.StrictMode>
    );

    // kollar efter header och main element
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();

    // kolla om det finns input med placeholder text search
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument(); // Search bar

    // kolla om det finns en favorites och toggle color mode knapp
    expect(screen.getByRole("button", { name: /toggle color mode/i })).toBeInTheDocument(); // Theme toggle button
    expect(screen.getByRole("button", { name: /favorites/i })).toBeInTheDocument(); // Favorites button
  });
});
