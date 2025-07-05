import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.background.light};
    color: ${theme.colors.gray[900]};
  }

  @media (prefers-color-scheme: dark) {
    body {
      background-color: ${theme.background.dark};
      color: ${theme.colors.white};
    }
  }

  h1 {
    font-size: ${theme.fontSizes['3xl']};
    color: ${theme.colors.gray[500]};
    width: 100%;
    font-weight: ${theme.fontWeights.bold};
    margin: 0;
  }

  @media (prefers-color-scheme: dark) {
    h1 {
      color: ${theme.colors.white};
    }
  }

  h2 {
    font-weight: ${theme.fontWeights.bold};
    font-size: ${theme.fontSizes['2xl']};
    margin: 0;
  }

  @media (prefers-color-scheme: dark) {
    h2 {
      color: ${theme.colors.white};
    }
  }

  h3 {
    font-weight: ${theme.fontWeights.bold};
    font-size: ${theme.fontSizes.xl};
    margin: 0;
  }

  @media (prefers-color-scheme: dark) {
    h3 {
      color: ${theme.colors.white};
    }
  }

  h4 {
    font-weight: ${theme.fontWeights.semibold};
    font-size: ${theme.fontSizes.lg};
    margin: 0;
  }

  @media (prefers-color-scheme: dark) {
    h4 {
      color: ${theme.colors.white};
    }
  }

  h5 {
    font-weight: ${theme.fontWeights.semibold};
    font-size: ${theme.fontSizes.base};
    margin: 0;
  }

  @media (prefers-color-scheme: dark) {
    h5 {
      color: ${theme.colors.white};
    }
  }

  a {
    color: ${theme.colors.blue[600]};
    text-decoration: underline;
  }

  @media (prefers-color-scheme: dark) {
    a {
      color: ${theme.colors.blue[300]};
    }
  }

  p {
    font-size: ${theme.fontSizes.base};
    margin: 0;
  }

  @media (prefers-color-scheme: dark) {
    p {
      color: ${theme.colors.white};
    }
  }

  svg {
    fill: currentColor;
  }

  @media (prefers-color-scheme: dark) {
    svg {
      color: ${theme.colors.white};
    }
  }

  label, input, textarea, button {
    @media (prefers-color-scheme: dark) {
      color: ${theme.colors.white};
    }
  }

  input, textarea {
    @media (prefers-color-scheme: dark) {
      background-color: ${theme.colors.black};
    }
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;