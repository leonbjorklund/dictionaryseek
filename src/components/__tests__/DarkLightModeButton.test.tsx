import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { DarkLightModeButton } from "../DarkLightModeButton";

// workaround för att använda chakras color mode
function TestComponent() {
  const { colorMode } = useColorMode();
  return (
    <>
      <DarkLightModeButton />
      <div data-testid="color-mode">{colorMode}</div>
    </>
  );
}

describe("DarkLightModeButton", () => {
  test("it toggles color mode on click", async () => {
    render(
      <ChakraProvider>
        <TestComponent />
      </ChakraProvider>
    );

    const button = screen.getByRole("button", { name: "Toggle color mode" });
    const initialColorMode = screen.getByTestId("color-mode").textContent;
    expect(["light", "dark"]).toContain(initialColorMode);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      userEvent.click(button);
    });

    // Wait for color mode change
    await waitFor(() => {
      const toggledColorMode = screen.getByTestId("color-mode").textContent;
      expect(toggledColorMode).not.toBe(initialColorMode);
    });
  });
});
