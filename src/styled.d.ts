import { AppTheme } from "./theme";

// If styled-components typings are not present, declare the minimal module shape here so TS can resolve it.
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AppTheme {}

  // Re-export the public styled-components API with minimal typings; this prevents "Cannot find module" errors
  // while still allowing us to augment the DefaultTheme interface.
  // Feel free to replace these any's with stricter types once @types/styled-components (v6) is installed.
  export function css(strings: TemplateStringsArray, ...interpolations: any[]): any;
  export const ThemeProvider: any;
  export default function styled(tag: any): any;
}