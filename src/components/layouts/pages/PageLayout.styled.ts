import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const PageStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${theme.spacing[10]};
  background-color: ${theme.background.light};
  padding-top: ${theme.spacing[20]};
  flex-grow: 1;

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.background.dark};
  }
`;

export const ContentWrapper = styled.div<{ $hasCustomPadding?: boolean }>`
  width: 100%;
  z-index: 1;
  ${({ $hasCustomPadding }) =>
    $hasCustomPadding &&
    `
    padding: ${theme.spacing[6]};
  `}
`;
