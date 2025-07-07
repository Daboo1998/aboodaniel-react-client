import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const PopupContent = styled.div`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.xl};
  overflow-y: auto;
  max-height: 90vh;
  max-width: 600px;
  width: 100%;

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.colors.gray[800]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    max-width: 100%;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }
`;

export const PopupTitle = styled.h2`
  margin: 0 0 ${theme.spacing[4]} 0;
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

export const OngoingContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: ${theme.spacing[4]};
`;

export const OngoingLabel = styled.p`
  margin: 0;
  padding-right: ${theme.spacing[4]};
  color: ${theme.colors.gray[800]};
  font-weight: ${theme.fontWeights.medium};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const OngoingCheckbox = styled.input`
  width: ${theme.spacing[4]};
  height: ${theme.spacing[4]};
  cursor: pointer;
  accent-color: ${theme.colors.blue[500]};
  
  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const DateInputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: ${theme.spacing[2]};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const DateInputSpacer = styled.div`
  width: 100%;
`;

export const RequiredFieldsText = styled.p`
  width: 100%;
  margin: 0;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray[600]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[400]};
  }
`;

export const RequiredAsterisk = styled.span`
  color: ${theme.colors.red[600]};
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
  margin-top: ${theme.spacing[2]};
`;