import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const MessageContainer = styled.div`
  padding-bottom: ${theme.spacing[2]};
  border-bottom: 1px solid ${theme.colors.black};
  cursor: pointer;
  transition: background-color ${theme.transitions.duration[200]} ${theme.transitions.easing['in-out']};

  @media (prefers-color-scheme: dark) {
    border-bottom-color: ${theme.colors.white};
  }

  &:hover {
    background-color: ${theme.colors.gray[50]};
    
    @media (prefers-color-scheme: dark) {
      background-color: ${theme.colors.gray[800]};
    }
  }
`;

export const MessageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MessageName = styled.h4`
  margin: 0;
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const MessageTimestamp = styled.p`
  flex-shrink: 0;
  margin: 0;
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.sm};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[400]};
  }
`;

export const MessageSubject = styled.h5`
  margin: ${theme.spacing[1]} 0;
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.gray[800]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[200]};
  }
`;

export const MessagePreview = styled.p`
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;
  color: ${theme.colors.gray[700]};
  line-height: 1.5;

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[300]};
  }
`;