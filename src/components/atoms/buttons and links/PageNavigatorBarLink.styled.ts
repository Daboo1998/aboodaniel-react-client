import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const StyledPageNavigatorBarLink = styled.button<{ $isActive: boolean }>`
  background-color: ${({ $isActive }) => 
    $isActive 
      ? theme.colors.gray[200] 
      : theme.background.light
  };
  border: none;
  border-bottom: 1px solid ${theme.colors.black};
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  font: inherit;
  width: 100%;
  text-align: left;
  font-size: ${theme.fontSizes.base};
  min-height: ${theme.spacing[12]};

  @media (prefers-color-scheme: dark) {
    background-color: ${({ $isActive }) => 
      $isActive 
        ? theme.colors.black 
        : theme.background.dark
    };
  }

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[4]} ${theme.spacing[8]};
    flex-shrink: 0;
    border-bottom: none;
    width: auto;
    text-align: center;
    min-width: max-content;
    white-space: nowrap;

    &:hover {
      background-color: ${theme.colors.gray[200]};
      
      @media (prefers-color-scheme: dark) {
        background-color: ${theme.colors.black};
      }
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    border-bottom: 1px solid ${theme.colors.black};
  }

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;