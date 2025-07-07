import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const PopupContent = styled.div`
  max-height: 100%;
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing[8]};
  background-color: ${theme.colors.white};
  overflow-y: auto;
  max-width: 90vw;
  width: 100%;
  max-width: 600px;

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.colors.black};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing[4]};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing[2]};
  border-radius: ${theme.borderRadius.sm};

  svg {
    width: ${theme.spacing[6]};
    height: ${theme.spacing[6]};
    fill: ${theme.colors.gray[600]};
    transition: fill ${theme.transitions.duration[200]} ${theme.transitions.easing['in-out']};
  }

  @media (min-width: ${theme.breakpoints.md}) {
    &:hover svg {
      fill: ${theme.colors.gray[600]};
    }
  }

  @media (prefers-color-scheme: dark) {
    svg {
      fill: ${theme.colors.gray[400]};
    }

    &:hover svg {
      fill: ${theme.colors.gray[200]};
    }
  }

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing[2]};
  border-radius: ${theme.borderRadius.sm};

  svg {
    width: ${theme.spacing[5]};
    height: ${theme.spacing[5]};
    fill: ${theme.colors.red[600]};
    transition: fill ${theme.transitions.duration[200]} ${theme.transitions.easing['in-out']};
  }

  @media (min-width: ${theme.breakpoints.md}) {
    &:hover svg {
      fill: ${theme.colors.red[900]};
    }
  }

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const MessageDetails = styled.div`
  border-bottom: 1px solid ${theme.colors.black};
  padding: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[4]};

  @media (prefers-color-scheme: dark) {
    border-bottom-color: ${theme.colors.white};
  }
`;

export const MessageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing[2]};
`;

export const MessageSubject = styled.h4`
  flex-shrink: 0;
  margin: 0;
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
`;

export const MessageTimestamp = styled.p`
  flex-shrink: 0;
  padding-left: ${theme.spacing[2]};
  margin: 0;
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.sm};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[400]};
  }
`;

export const MessageInfo = styled.p`
  margin: ${theme.spacing[1]} 0;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray[800]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const MessageInfoHighlight = styled.span`
  color: ${theme.colors.gray[600]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[400]};
  }
`;

export const MessageContent = styled.p`
  max-width: 65ch;
  padding: ${theme.spacing[4]};
  white-space: pre-wrap;
  margin: 0;
  line-height: 1.6;
  color: ${theme.colors.gray[800]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[200]};
  }
`;

export const ReplyButton = styled.div`
  width: 100%;
  margin-top: ${theme.spacing[4]};

  button {
    padding: ${theme.spacing[3]} ${theme.spacing[5]};
    width: 100%;
  }
`;