import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const ContactContainer = styled.div`
  padding-top: ${theme.spacing[10]};
  display: flex;
  flex-direction: column;
  place-items: center;
  width: 100%;
`;

export const ContactTitle = styled.h1`
  text-align: center;
  margin: 0 0 ${theme.spacing[6]} 0;
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  gap: ${theme.spacing[4]};

  @media (min-width: ${theme.breakpoints.md}) {
    width: 32rem;
  }
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

export const InformationMessage = styled.p`
  color: ${theme.colors.green[600]};
  margin: 0;
  font-size: ${theme.fontSizes.sm};
  text-align: center;
  min-height: ${theme.spacing[4]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.green[400]};
  }
`;

export const ErrorMessage = styled.p`
  color: ${theme.colors.red[600]};
  margin: 0;
  font-size: ${theme.fontSizes.sm};
  text-align: center;
  font-weight: ${theme.fontWeights.bold};
  min-height: ${theme.spacing[4]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.red[400]};
  }
`;

export const SubmitButtonContainer = styled.div`
  margin-top: ${theme.spacing[2]};
`;