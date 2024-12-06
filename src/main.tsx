import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import customTheme from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={customTheme}>
    <App />
  </ChakraProvider>
);
