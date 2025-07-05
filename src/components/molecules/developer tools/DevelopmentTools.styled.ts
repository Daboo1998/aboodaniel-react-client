import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const DevelopmentToolsContainer = styled.div`
  width: 100%;
`;

export const DevelopmentToolsTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.gray[500]};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing[6]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[400]};
  }
`;

export const RolesListContainer = styled.div`
  margin-top: ${theme.spacing[4]};
  border: 1px solid ${theme.colors.black};
  width: 100%;

  @media (prefers-color-scheme: dark) {
    border-color: ${theme.colors.white};
  }
`;

export const RolesListHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${theme.colors.black};
  align-items: center;
  padding: 0 ${theme.spacing[2]};
  gap: ${theme.spacing[2]};

  @media (prefers-color-scheme: dark) {
    border-bottom-color: ${theme.colors.white};
  }
`;

export const RolesListTitle = styled.h2`
  margin: 0;
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  padding: ${theme.spacing[1]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.sm};
  
  svg {
    width: ${theme.spacing[5]};
    height: ${theme.spacing[5]};
    fill: ${theme.colors.red[600]};
    transition: fill ${theme.transitions.duration[200]} ${theme.transitions.easing['in-out']};
  }

  @media (min-width: ${theme.breakpoints.md}) {
    &:hover svg {
      fill: ${theme.colors.red[900]};
    }
  }

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const RolesList = styled.ul`
  padding: 0 ${theme.spacing[2]};
  margin: 0;
  list-style: none;
`;