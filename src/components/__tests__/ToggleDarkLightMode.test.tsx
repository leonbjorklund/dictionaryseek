import userEvent from "@testing-library/user-event";
import { render, screen } from "../../utils/test-utils";
import { DarkLightModeButton } from "../DarkLightModeButton";

describe("Toggle Dark Light Mode", () => {
  test("toggles color mode on darklightmodebutton-click", async () => {
    render(<DarkLightModeButton />);

    const button = screen.getByRole("button", { name: "Toggle color mode" });
    expect(button).toBeInTheDocument();

    // Klicka en gång - byt till dark mode på body
    await userEvent.click(button);
    expect(document.body.className).toBe("chakra-ui-dark");

    // Klicka en gång till - byt tillbaka till light mode på body
    await userEvent.click(button);
    expect(document.body.className).toBe("chakra-ui-light");

    // Klicka en gång till - byt tillbaka till dark mode igen på body
    await userEvent.click(button);
    expect(document.body.className).toBe("chakra-ui-dark");

    // kan troligtvis skrivas med en loop, men 3 klick visar iaf funktionalitet.
  });
});
