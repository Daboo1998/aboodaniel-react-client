import styled, { css } from 'styled-components';
import { theme } from '../../../styles/theme';

export interface StyledButtonProps {
  $buttonType: 'primary' | 'destructive' | 'constructive';
  $buttonSize: 'smallFullWidth' | 'mediumFullWidth' | 'bigFullWidth' | 'small' | 'medium' | 'big';
  $nonUppercase?: boolean;
}

const getButtonTheme = (buttonType: string) => {
  switch (buttonType) {
    case 'primary':
      return css`
        background-color: ${theme.colors.gray[600]};
        &:hover {
          @media (min-width: ${theme.breakpoints.md}) {
            background-color: ${theme.colors.gray[900]};
          }
        }
      `;
    case 'constructive':
      return css`
        background-color: ${theme.colors.green[600]};
        &:hover {
          @media (min-width: ${theme.breakpoints.md}) {
            background-color: ${theme.colors.green[900]};
          }
        }
      `;
    case 'destructive':
      return css`
        background-color: ${theme.colors.red[600]};
        &:hover {
          @media (min-width: ${theme.breakpoints.md}) {
            background-color: ${theme.colors.red[900]};
          }
        }
      `;
    default:
      return css`
        background-color: ${theme.colors.gray[600]};
        &:hover {
          @media (min-width: ${theme.breakpoints.md}) {
            background-color: ${theme.colors.gray[900]};
          }
        }
      `;
  }
};

const getButtonSize = (buttonSize: string) => {
  switch (buttonSize) {
    case 'bigFullWidth':
      return css`
        width: 100%;
        padding: ${theme.spacing[5]} ${theme.spacing[2]};
      `;
    case 'big':
      return css`
        padding: ${theme.spacing[5]} ${theme.spacing[2]};
      `;
    case 'mediumFullWidth':
      return css`
        width: 100%;
        padding: ${theme.spacing[2]};
      `;
    case 'medium':
      return css`
        padding: ${theme.spacing[2]};
      `;
    case 'smallFullWidth':
      return css`
        width: 100%;
      `;
    case 'small':
    default:
      return css``;
  }
};

export const StyledButton = styled.button<StyledButtonProps>`
  ${({ $buttonType }) => getButtonTheme($buttonType)}
  ${({ $buttonSize }) => getButtonSize($buttonSize)}
  
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing[1]};
  border: none;
  cursor: pointer;
  text-transform: ${({ $nonUppercase }) => $nonUppercase ? 'none' : 'uppercase'};
  font-family: inherit;
  transition: background-color ${theme.transitions.duration[200]} ${theme.transitions.easing['in-out']};
  
  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;