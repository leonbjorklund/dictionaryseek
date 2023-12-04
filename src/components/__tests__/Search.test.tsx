import userEvent from "@testing-library/user-event";
import App from "../../App";
import { render, screen, waitFor } from "../../utils/test-utils";

describe("SearchBar and DisplayResults integration", () => {
  test("shows a correct definition when submitting a mocked word", async () => {
    render(<App />);

    // Skriv in och submitta "hello"
    const searchInput = screen.getByLabelText("search");
    await userEvent.type(searchInput, "hello");
    const submitButton = screen.getByLabelText("submit");
    await userEvent.click(submitButton);

    // Kolla om defintion finns i DOM:en (i displayresults)
    await waitFor(() => {
      const result = screen.getByText(/1\. "hello!" or an equivalent greeting\./i);
      expect(result).toBeInTheDocument();
    });
  });
});
