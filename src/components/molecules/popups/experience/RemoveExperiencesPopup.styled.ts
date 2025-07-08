import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
  background-color: ${theme.colors.white};
  padding: ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.xl};
  max-height: 100%;
  min-width: 400px;
  max-width: 600px;

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.colors.gray[800]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    max-width: 100%;
    min-width: 100%;
  }
`;

export const ExperiencesList = styled.ol`
  overflow-y: auto;
  max-height: 400px;
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing[2]};

  @media (prefers-color-scheme: dark) {
    border-color: ${theme.colors.gray[600]};
  }
`;

export const ExperienceItem = styled.li`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing[2]};
  align-items: center;
  padding: ${theme.spacing[2]};
  border-radius: ${theme.borderRadius.sm};
  transition: background-color ${theme.transitions.duration[200]} ${theme.transitions.easing['in-out']};

  &:hover {
    background-color: ${theme.colors.gray[50]};

    @media (prefers-color-scheme: dark) {
      background-color: ${theme.colors.gray[700]};
    }
  }
`;

export const ExperienceCheckbox = styled.input`
  width: ${theme.spacing[4]};
  height: ${theme.spacing[4]};
  cursor: pointer;
  accent-color: ${theme.colors.blue[500]};
  
  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const ExperienceTitle = styled.p`
  margin: 0;
  color: ${theme.colors.gray[800]};
  font-size: ${theme.fontSizes.sm};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const ErrorMessage = styled.p`
  color: ${theme.colors.red[800]};
  margin: 0;
  font-size: ${theme.fontSizes.sm};
  text-align: center;
  min-height: ${theme.spacing[4]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.red[400]};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};

  button {
    width: 100%;
    padding: ${theme.spacing[2]} ${theme.spacing[5]};
  }
`;