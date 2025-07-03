import { css } from "styled-components";
import { breakpoints } from "../theme";

type BreakpointKey = keyof typeof breakpoints;

export const up = (bp: BreakpointKey) => `@media (min-width: ${breakpoints[bp]})`;
export const down = (bp: BreakpointKey) => `@media (max-width: ${breakpoints[bp]})`;

export const media = { up, down };

// Optional helper for styled-components tagged template usage
export const respondUp = (bp: BreakpointKey) => (
  strings: TemplateStringsArray,
  ...interpolations: Parameters<typeof css>
) => css`
  ${up(bp)} {
    ${css(strings, ...interpolations)}
  }
`;

export const respondDown = (bp: BreakpointKey) => (
  strings: TemplateStringsArray,
  ...interpolations: Parameters<typeof css>
) => css`
  ${down(bp)} {
    ${css(strings, ...interpolations)}
  }
`;