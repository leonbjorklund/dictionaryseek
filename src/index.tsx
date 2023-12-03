import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client"; // Importing createRoot
import App from "./App";
import { AppProvider } from "./utils/AppContext";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement); // Create a root with type assertion

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ChakraProvider>
  </React.StrictMode>
);
