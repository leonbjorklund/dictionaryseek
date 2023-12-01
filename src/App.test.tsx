import { render, screen } from "@testing-library/react";
import App from "./App";

// Basic test för att kolla om alla väsentliga element finns med

describe("App Component", () => {
  test("renders with essential elements", () => {
    render(<App />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();

    // Kolla efter placeholder-text för att identifiera searchbbar
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();

    // Använder aria-label för eller namn för att identifiera knappar
    expect(screen.getByRole("button", { name: /toggle color mode/i })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /favorites/i })).toBeInTheDocument();
  });
});
