import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./components/context providers/AuthContextProvider";
import dotenv from "dotenv";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
