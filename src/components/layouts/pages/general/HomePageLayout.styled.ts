import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const WelcomeTitle = styled.h1`
  text-align: center;
  padding-bottom: ${theme.spacing[20]};
  font-size: 50px;
  line-height: 60px;
  margin: 0;
  color: ${theme.colors.gray[900]};
  font-weight: ${theme.fontWeights.bold};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 36px;
    line-height: 44px;
    padding-bottom: ${theme.spacing[12]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 28px;
    line-height: 36px;
    padding-bottom: ${theme.spacing[8]};
  }
`;

export const WelcomeText = styled.p`
  text-align: center;
  padding: 0 ${theme.spacing[20]};
  margin: 0;
  color: ${theme.colors.gray[700]};
  line-height: 1.6;
  font-size: ${theme.fontSizes.lg};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[300]};
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    padding: 0 ${theme.spacing[12]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing[8]};
    font-size: ${theme.fontSizes.base};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.spacing[4]};
  }
`;