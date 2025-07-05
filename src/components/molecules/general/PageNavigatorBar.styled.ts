import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const NavigatorContainer = styled.div<{ $isHidden: boolean }>`
  display: flex;
  flex-direction: column;
  border-color: ${theme.colors.black};
  position: fixed;
  width: 100%;
  top: 0;
  z-index: ${theme.zIndices.docked};
  
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
  width: 2.5rem;
  height: 3.5rem;
  width: 100%;

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.background.dark};
  }

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

export const MenuButton = styled.button`
  border: none;
  padding: ${theme.spacing[2]};
  width: 2.5rem;
  padding-left: ${theme.spacing[6]};
  background: transparent;
  cursor: pointer;

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const PageTitle = styled.h3`
  height: 100%;
  padding: ${theme.spacing[3]} ${theme.spacing[6]};
  padding-left: ${theme.spacing[6]};
  margin: 0;
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

export const NavigationContent = styled.div<{ $isHidden: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${theme.background.light};
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: height 0.5s ease-in-out;

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.background.dark};
  }

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: ${({ $isHidden }) => $isHidden ? '0' : '100vh'};
  }
`;