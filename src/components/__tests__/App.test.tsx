import { render, screen } from "../../utils/test-utils";

import App from "../../App";

// basic test för att kolla att alla komponenter från uppgiftbeskrivningen finns med!
test("render default element", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: /DictionarySeek/i })).toBeInTheDocument();
  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(screen.getByRole("main")).toBeInTheDocument();

  // kolla om det finns input med placeholder text search
  expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();

  // kolla om det finns en favorites och toggle color mode knapp
  expect(screen.getByRole("button", { name: /toggle color mode/i })).toBeInTheDocument(); // Theme toggle button
  expect(screen.getByRole("button", { name: /favorites/i })).toBeInTheDocument(); // Favorites button
});
