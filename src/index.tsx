import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthContextProvider from "./components/context providers/AuthContextProvider";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import "./index.css";
import "./styles/accessibility.css";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AccessibilityProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
