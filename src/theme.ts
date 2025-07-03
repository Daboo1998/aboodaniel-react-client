import { DefaultTheme } from "styled-components";

// Central design-tokens converted from Tailwind config so components can share the same palette & break-points
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const theme: DefaultTheme = {
  colors: {
    gray600: "#4b5563",
    gray900: "#111827",
    green600: "#16a34a",
    green900: "#065f46",
    red600: "#dc2626",
    red900: "#991b1b",
    backgroundLight: "#f3f3f3",
    backgroundDark: "#1f1f1f",
  },
  breakpoints,
};

// Helper type so other modules can infer the theme shape
export type AppTheme = typeof theme;

export default theme;