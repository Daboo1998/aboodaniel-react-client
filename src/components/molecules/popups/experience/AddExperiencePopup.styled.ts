import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const PopupContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: ${theme.spacing[8]};
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 85vh;
  height: auto;
  max-width: 700px;
  width: 90%;
  margin: 20px auto;
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.2), inset 0 0 32px rgba(0, 0, 0, 0.05),
    inset 0 0 64px rgba(0, 0, 0, 0.02);
  position: relative;
  animation: slideIn 0.3s ease-out;
  display: flex;
  flex-direction: column;

  /* Add scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 95%;
    max-height: 90vh;
    margin: 10px auto;
    padding: ${theme.spacing[6]};
  }

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
`;

export const PopupTitle = styled.h2`
  color: white;
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 700;
  margin: 0 0 ${theme.spacing[7]} 0;
  text-align: center;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing[4]};
  right: ${theme.spacing[4]};
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
  font-size: 20px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[5]};
  width: 100%;
  overflow-y: visible;
  flex: 1;
  min-height: 0;
`;

export const OngoingContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: ${theme.spacing[4]};
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${theme.spacing[4]};
  position: relative;
  z-index: 1;

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.05);
  }
`;

export const OngoingLabel = styled.p`
  margin: 0;
  padding-right: ${theme.spacing[4]};
  color: ${theme.colors.white};
  font-weight: ${theme.fontWeights.medium};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const OngoingCheckbox = styled.input`
  width: ${theme.spacing[5]};
  height: ${theme.spacing[5]};
  cursor: pointer;
  accent-color: ${theme.colors.blue[400]};
  border-radius: 6px;

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const DateInputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: ${theme.spacing[4]};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const DateInputSpacer = styled.div`
  width: 100%;
`;

export const RequiredFieldsText = styled.p`
  width: 100%;
  margin: 0;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray[300]};
  position: relative;
  z-index: 1;

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[400]};
  }
`;

export const RequiredAsterisk = styled.span`
  color: ${theme.colors.red[400]};
`;

export const ErrorMessage = styled.p`
  color: ${theme.colors.red[600]};
  margin: 0;
  font-size: ${theme.fontSizes.sm};
  text-align: center;
  min-height: ${theme.spacing[4]};
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

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};
  width: 100%;
  margin-top: ${theme.spacing[6]};
  padding-top: ${theme.spacing[4]};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
`;
