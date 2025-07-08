import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const PopupOverlay = styled.div<{ $isShown: boolean }>`
  z-index: ${theme.zIndices.overlay};
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.gray[100]};
  background-color: rgba(${theme.colors.gray[100]}, 0.8);
  display: ${({ $isShown }) => $isShown ? 'flex' : 'none'};
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.colors.black};
    background-color: rgba(${theme.colors.black}, 0.8);
  }
`;