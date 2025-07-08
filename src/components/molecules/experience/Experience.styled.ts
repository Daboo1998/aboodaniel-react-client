import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const ExperienceContainer = styled.div`
  padding-bottom: ${theme.spacing[12]};
`;

export const ExperienceHeader = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  top: ${theme.spacing[12]};
  border-top: 2px solid ${theme.colors.black};
  padding: ${theme.spacing[2]};
  cursor: pointer;
  background-color: ${theme.colors.white};
  z-index: ${theme.zIndices.sticky};

  @media (prefers-color-scheme: dark) {
    border-color: ${theme.colors.white};
    background-color: ${theme.colors.black};
  }
`;

export const ExperienceTitle = styled.h3`
  margin: 0;
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  color: ${theme.colors.blue[600]};
  padding: 0;
  text-decoration: underline;

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.blue[400]};
  }

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const TimeDescription = styled.div`
  cursor: pointer;
`;

export const TimeDescriptionText = styled.h4`
  color: ${theme.colors.gray[600]};
  border-bottom: 1px solid ${theme.colors.black};
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  margin: ${theme.spacing[1]} 0;
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};

  @media (prefers-color-scheme: dark) {
    border-color: ${theme.colors.white};
    color: ${theme.colors.white};
  }
`;

export const DetailsContainer = styled.div<{ $isHidden: boolean }>`
  max-height: ${({ $isHidden }) => $isHidden ? '0' : 'none'};
  overflow: hidden;
  transition: max-height 1000ms ease-in-out;
`;

export const DetailsText = styled.p`
  padding: ${theme.spacing[2]};
  white-space: pre-wrap;
  margin: 0;
  color: ${theme.colors.gray[800]};
  line-height: 1.6;

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[200]};
  }

  a {
    color: ${theme.colors.blue[600]};
    text-decoration: underline;

    @media (prefers-color-scheme: dark) {
      color: ${theme.colors.blue[400]};
    }

    &:hover {
      color: ${theme.colors.blue[800]};
      
      @media (prefers-color-scheme: dark) {
        color: ${theme.colors.blue[300]};
      }
    }
  }
`;