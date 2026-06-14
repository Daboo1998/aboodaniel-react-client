import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const PopupOverlay = styled.div<{ $isShown: boolean }>`
  z-index: ${theme.zIndices.overlay};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: ${({ $isShown }) => ($isShown ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
  overscroll-behavior: contain;
  animation: ${({ $isShown }) => ($isShown ? "fadeIn 0.3s ease-out" : "none")};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.6);
  }
`;
