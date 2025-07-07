import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const UnauthorizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

export const UnauthorizedTitle = styled.h1`
  margin: 0;
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const UnauthorizedMessage = styled.p`
  margin: 0;
  color: ${theme.colors.gray[700]};
  line-height: 1.6;

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[300]};
  }
`;

export const MessagesTitle = styled.h1`
  margin: 0 0 ${theme.spacing[4]} 0;
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const MessagesContainer = styled.div<{ $hasMessages: boolean }>`
  ${({ $hasMessages }) => $hasMessages && `
    border-top: 1px solid ${theme.colors.black};
    margin-top: ${theme.spacing[4]};
    
    @media (prefers-color-scheme: dark) {
      border-top-color: ${theme.colors.white};
    }
  `}
`;