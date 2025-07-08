import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const NavigatorContainer = styled.div<{ $isHidden: boolean }>`
  display: flex;
  flex-direction: column;
  border-color: ${theme.colors.black};
  position: fixed;
  width: 100%;
  top: 0;
  z-index: ${theme.zIndices.overlay};
  
  ${({ $isHidden }) => !$isHidden && `
    border-bottom: ${theme.borderWidths[1]} solid ${theme.colors.black};
  `}

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    box-shadow: ${theme.shadows.md};
    height: unset;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    ${({ $isHidden }) => !$isHidden && `
      height: 100vh;
    `}
  }
`;

export const MobileHeader = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${theme.background.light};
  width: 100%;
  height: 3.5rem;
  min-height: 3.5rem;
  border-bottom: 1px solid ${theme.colors.black};

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.background.dark};
    border-bottom-color: ${theme.colors.white};
  }

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

export const MenuButton = styled.button`
  border: none;
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
  min-width: 2.5rem;
  height: 100%;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    width: ${theme.spacing[6]};
    height: ${theme.spacing[6]};
  }

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const PageTitle = styled.h3`
  height: 100%;
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
  margin: 0;
  display: flex;
  align-items: center;
  flex-grow: 1;
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
`;

export const BrandTitle = styled.h3`
  white-space: nowrap;
  align-self: center;
  padding: ${theme.spacing[4]};
  position: absolute;
  height: 100%;
  cursor: pointer;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

export const NavigationContent = styled.div.withConfig({
  shouldForwardProp: (prop: string) => prop !== '$isHidden',
})<{ $isHidden: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${theme.background.light};
  width: 100%;
  overflow: ${({ $isHidden }) => $isHidden ? 'hidden' : 'visible'};
  transition: height 0.3s ease-in-out;
  pointer-events: ${({ $isHidden }) => $isHidden ? 'none' : 'auto'};

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.background.dark};
  }

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: auto !important;
    overflow: visible;
    pointer-events: auto;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: ${({ $isHidden }) => $isHidden ? '0' : 'calc(100vh - 3.5rem - env(safe-area-inset-bottom))'};
    align-items: stretch;
    justify-content: flex-start;
    padding-top: ${({ $isHidden }) => $isHidden ? '0' : theme.spacing[2]};
    padding-bottom: ${({ $isHidden }) => $isHidden ? '0' : 'env(safe-area-inset-bottom)'};
  }
`;