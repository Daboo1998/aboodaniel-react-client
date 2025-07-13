import styled from "styled-components";
import { theme } from '../../../styles/theme';

export const FooterStyled = styled.div<{ $isInsideMenu: boolean }>`
  display: ${({ $isInsideMenu }) => $isInsideMenu ? 'flex' : 'none'};
  flex-direction: column;
  background-color: ${theme.background.light};
  padding-bottom: ${theme.spacing[6]};
  gap: ${theme.spacing[4]};

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.background.dark};
  }

  ${({ $isInsideMenu }) => $isInsideMenu && `
    flex-grow: 1;
    justify-content: flex-end;
    /* Base margin for separation */
    margin-bottom: ${theme.spacing[2]};
    
    /* iOS Safari specific adjustment - only add safe area inset */
    @supports (-webkit-touch-callout: none) {
      padding-bottom: env(safe-area-inset-bottom, 0px);
    }

    @media (min-width: ${theme.breakpoints.md}) {
      display: none;
    }
  `}

  @media (min-width: ${theme.breakpoints.md}) {
    display: ${({ $isInsideMenu }) => $isInsideMenu ? 'none' : 'flex'};
  }
`;

export const SocialIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing[2]};
`;

export const SocialLink = styled.a`
  padding: ${theme.spacing[2]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.sm};
  transition: background-color ${theme.transitions.duration[200]} ${theme.transitions.easing['in-out']};

  svg {
    width: ${theme.spacing[6]};
    height: ${theme.spacing[6]};
    fill: ${theme.colors.gray[600]};
    transition: fill ${theme.transitions.duration[200]} ${theme.transitions.easing['in-out']};
  }

  &:hover svg {
    fill: ${theme.colors.gray[800]};
  }

  @media (prefers-color-scheme: dark) {
    svg {
      fill: ${theme.colors.gray[400]};
    }

    &:hover svg {
      fill: ${theme.colors.white};
    }
  }

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const Spacer = styled.br`
  margin: ${theme.spacing[2]} 0;
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

export const AuthLinksContainer = styled.div<{ $isLoggedIn: boolean }>`
  display: flex;
  flex-direction: ${({ $isLoggedIn }) => $isLoggedIn ? 'column' : 'row'};
  gap: ${theme.spacing[2]};
  align-items: center;
`;

export const FooterLink = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray[600]};
  text-align: center;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  text-decoration: underline;
  padding: ${theme.spacing[1]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[400]};
  }

  @media (min-width: ${theme.breakpoints.md}) {
    &:hover {
      color: ${theme.colors.gray[800]};
      
      @media (prefers-color-scheme: dark) {
        color: ${theme.colors.white};
      }
    }
  }

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const UserInfo = styled.p`
  margin: 0;
  text-align: center;
  color: ${theme.colors.gray[800]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const UserName = styled.span`
  color: ${theme.colors.blue[800]};
  
  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.blue[300]};
  }
`;

export const CopyrightText = styled.p`
  text-align: center;
  font-size: ${theme.fontSizes.xs};
  margin: 0;
  color: ${theme.colors.gray[600]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[400]};
  }
`;
