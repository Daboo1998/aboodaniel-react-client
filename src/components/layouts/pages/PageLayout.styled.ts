import styled from "styled-components";
import { theme } from '../../../styles/theme';

export const PageStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${theme.spacing[10]};
  background-color: ${theme.background.light};
  padding-top: ${theme.spacing[20]};
  padding-bottom: calc(${theme.spacing[10]} + env(safe-area-inset-bottom) + 4rem);
  flex-grow: 1;

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.background.dark};
  }

  /* Additional Safari-specific bottom padding for all pages */
  @supports (-webkit-touch-callout: none) {
    padding-bottom: calc(${theme.spacing[10]} + env(safe-area-inset-bottom) + 5rem);
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
`;
