import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthContextProvider from "./components/context providers/AuthContextProvider";
import dotenv from "dotenv";
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
