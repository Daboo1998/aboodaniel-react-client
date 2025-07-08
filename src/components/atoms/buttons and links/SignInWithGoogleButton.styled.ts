import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const GoogleSignInButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing[2]};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};
  width: max-content;
  box-shadow: ${theme.shadows.sm};
  background-color: ${theme.colors.white};
  cursor: pointer;
  transition: all ${theme.transitions.duration[200]} ${theme.transitions.easing['in-out']};

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.colors.black};
    border-color: ${theme.colors.gray[600]};
  }

  @media (min-width: ${theme.breakpoints.md}) {
    &:hover {
      border-color: ${theme.colors.blue[800]};
    }
  }

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const GoogleIcon = styled.img`
  width: ${theme.spacing[5]};
  flex-shrink: 0;
`;

export const ButtonText = styled.p`
  flex-shrink: 0;
  padding-left: ${theme.spacing[2]};
  font-weight: ${theme.fontWeights.light};
  margin: 0;
  color: ${theme.colors.gray[800]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;