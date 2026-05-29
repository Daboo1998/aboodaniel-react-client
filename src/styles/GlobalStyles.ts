import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Design tokens are in index.css */
  /* This file handles any styled-components-specific global resets */

  body {
    margin: 0;
    font-family: var(--font-sans);
    background: var(--bg);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: var(--font-sans);
    cursor: pointer;
    border: none;
    padding: 0;
    background: none;
  }

  img {
    display: block;
    max-width: 100%;
  }

  svg {
    display: block;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-family: var(--font-sans);
    color: var(--text);
  }

  p {
    margin: 0;
    color: var(--text);
  }

  input, textarea, select {
    font-family: var(--font-sans);
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  @media print {
    .no-print { display: none !important; }
  }
`;
