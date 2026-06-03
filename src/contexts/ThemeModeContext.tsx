import React, { useCallback, useContext, useEffect, useState } from "react";

type Mode = "light" | "dark";

const STORAGE_KEY = "da-theme";

interface ThemeModeContextValue {
  mode: Mode;
  toggle: () => void;
}

const ThemeModeContext = React.createContext<ThemeModeContextValue>({
  mode: "light",
  toggle: () => {},
});

const getInitialMode = (): Mode => {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyMode = (mode: Mode) => {
  document.documentElement.setAttribute("data-theme", mode);
};

const ThemeModeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<Mode>(getInitialMode);

  useEffect(() => {
    applyMode(mode);
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggle = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeModeContext.Provider value={{ mode, toggle }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeModeContext);

export default ThemeModeProvider;
