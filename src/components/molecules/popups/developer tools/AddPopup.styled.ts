import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const PopupContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: ${theme.spacing[8]};
  min-width: 400px;
  max-width: 500px;
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.2), inset 0 0 32px rgba(0, 0, 0, 0.05),
    inset 0 0 64px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Enhanced refraction with subtle edge rainbow */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      /* Primary refraction layer */ linear-gradient(
        135deg,
        transparent 0%,
        rgba(255, 255, 255, 0.1) 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.05) 75%,
        transparent 100%
      ),
      /* Very subtle rainbow dispersion only at extreme edges */
        linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 0, 0, 0.008) 2%,
          rgba(255, 165, 0, 0.008) 3%,
          rgba(255, 255, 0, 0.008) 4%,
          rgba(0, 255, 0, 0.008) 5%,
          rgba(0, 255, 255, 0.008) 6%,
          rgba(0, 0, 255, 0.008) 7%,
          rgba(238, 130, 238, 0.008) 8%,
          transparent 10%,
          transparent 90%,
          rgba(238, 130, 238, 0.008) 92%,
          rgba(0, 0, 255, 0.008) 93%,
          rgba(0, 255, 255, 0.008) 94%,
          rgba(0, 255, 0, 0.008) 95%,
          rgba(255, 255, 0, 0.008) 96%,
          rgba(255, 165, 0, 0.008) 97%,
          rgba(255, 0, 0, 0.008) 98%,
          transparent 100%
        );
    pointer-events: none;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.1);
    border-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 16px 64px rgba(0, 0, 0, 0.4),
      inset 0 0 32px rgba(0, 0, 0, 0.1), inset 0 0 64px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 90%;
    height: auto;
    border-radius: 20px;
    max-width: 90%;
    min-width: auto;
    padding: ${theme.spacing[6]};
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing[6]};
  position: relative;
  z-index: 1;
`;

export const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  padding: ${theme.spacing[3]};
  align-self: flex-end;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;

  svg {
    width: ${theme.spacing[5]};
    height: ${theme.spacing[5]};
    fill: ${theme.colors.gray[300]};
    transition: fill 0.2s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

    svg {
      fill: ${theme.colors.gray[100]};
    }
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.1);
    border-color: rgba(255, 255, 255, 0.05);

    svg {
      fill: ${theme.colors.gray[400]};
    }

    &:hover {
      background: rgba(0, 0, 0, 0.2);
      border-color: rgba(255, 255, 255, 0.1);

      svg {
        fill: ${theme.colors.white};
      }
    }
  }

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[5]};
  position: relative;
  z-index: 1;
`;

export const ErrorMessage = styled.p`
  color: ${theme.colors.red[600]};
  font-size: ${theme.fontSizes.sm};
  margin: 0;
  text-align: center;
  background: rgba(239, 68, 68, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  padding: ${theme.spacing[3]};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 0 8px rgba(0, 0, 0, 0.03),
    inset 0 0 16px rgba(0, 0, 0, 0.01);
  position: relative;
  z-index: 1;
  overflow: hidden;

  /* Enhanced refraction with subtle edge rainbow */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      /* Primary refraction layer */ linear-gradient(
        135deg,
        transparent 0%,
        rgba(239, 68, 68, 0.1) 25%,
        transparent 50%,
        rgba(239, 68, 68, 0.05) 75%,
        transparent 100%
      ),
      /* Very subtle rainbow dispersion only at extreme edges */
        linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 0, 0, 0.008) 2%,
          rgba(255, 165, 0, 0.008) 3%,
          rgba(255, 255, 0, 0.008) 4%,
          rgba(0, 255, 0, 0.008) 5%,
          rgba(0, 255, 255, 0.008) 6%,
          rgba(0, 0, 255, 0.008) 7%,
          rgba(238, 130, 238, 0.008) 8%,
          transparent 10%,
          transparent 90%,
          rgba(238, 130, 238, 0.008) 92%,
          rgba(0, 0, 255, 0.008) 93%,
          rgba(0, 255, 255, 0.008) 94%,
          rgba(0, 255, 0, 0.008) 95%,
          rgba(255, 255, 0, 0.008) 96%,
          rgba(255, 165, 0, 0.008) 97%,
          rgba(255, 0, 0, 0.008) 98%,
          transparent 100%
        );
    pointer-events: none;
  }

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.red[400]};
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.3);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 0 8px rgba(0, 0, 0, 0.1),
      inset 0 0 16px rgba(0, 0, 0, 0.05);
  }
`;

export const SubmitButtonContainer = styled.div`
  width: 100%;
  margin-top: ${theme.spacing[2]};
  position: relative;
  z-index: 1;

  button {
    width: 100%;
    padding: ${theme.spacing[3]} ${theme.spacing[6]};
  }
`;
