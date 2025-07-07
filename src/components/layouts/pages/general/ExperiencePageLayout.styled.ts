import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const ExperienceContainer = styled.div`
  padding-top: ${theme.spacing[10]};
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing[2]};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${theme.spacing[2]};
`;

export const ExperienceTitle = styled.h1`
  margin: 0;
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing[2]};
  width: 100%;

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const ActionButton = styled.div`
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-shrink: 1;
    width: 100%;
  }
`;

export const ExperiencesContainer = styled.div`
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.black};
  margin-top: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[4]};
  overflow: hidden;

  @media (prefers-color-scheme: dark) {
    border-color: ${theme.colors.white};
  }
`;