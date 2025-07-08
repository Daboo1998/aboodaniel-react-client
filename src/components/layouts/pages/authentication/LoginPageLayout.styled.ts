import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const LoginTitle = styled.h1`
  text-align: center;
  margin: 0 0 ${theme.spacing[4]} 0;
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  height: 100%;
  padding-top: ${theme.spacing[2]};
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  gap: ${theme.spacing[4]};
  align-items: center;

  @media (min-width: ${theme.breakpoints.md}) {
    width: 24rem;
  }
`;

export const ErrorMessage = styled.p`
  color: ${theme.colors.red[600]};
  font-size: ${theme.fontSizes.sm};
  margin: 0;
  text-align: center;
  width: 100%;

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.red[400]};
  }
`;

export const SubmitButtonContainer = styled.div`
  width: 100%;

  button {
    width: 100%;
    padding: ${theme.spacing[2]} ${theme.spacing[5]};
  }
`;

export const RegisterLinkContainer = styled.div`
  margin-top: ${theme.spacing[2]};

  button {
    color: ${theme.colors.blue[500]};
    padding-top: ${theme.spacing[2]};
    text-decoration: underline;

    @media (prefers-color-scheme: dark) {
      color: ${theme.colors.blue[400]};
    }

    &:hover {
      color: ${theme.colors.blue[700]};

      @media (prefers-color-scheme: dark) {
        color: ${theme.colors.blue[300]};
      }
    }
  }
`;