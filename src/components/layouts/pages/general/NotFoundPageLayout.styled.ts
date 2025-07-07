import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const ErrorCode = styled.div`
  text-align: center;
  font-size: ${theme.fontSizes['9xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.gray[500]};
  padding: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[4]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[400]};
  }
`;

export const ErrorTitle = styled.h1`
  font-weight: ${theme.fontWeights.bold};
  margin: 0 0 ${theme.spacing[4]} 0;
  text-align: center;
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const ErrorSubtitle = styled.h2`
  margin: 0 0 ${theme.spacing[4]} 0;
  text-align: center;
  color: ${theme.colors.gray[800]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[200]};
  }
`;

export const ErrorDescription = styled.p`
  margin: 0;
  text-align: center;
  color: ${theme.colors.gray[700]};
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[300]};
  }
`;