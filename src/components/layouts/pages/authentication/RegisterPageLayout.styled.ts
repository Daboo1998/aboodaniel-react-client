import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const RegisterTitle = styled.h1`
  text-align: center;
  margin: 0 0 ${theme.spacing[4]} 0;
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  height: 100%;
  padding-top: ${theme.spacing[10]};
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding-left: ${theme.spacing[6]};
  padding-right: ${theme.spacing[6]};

  @media (max-width: ${theme.breakpoints.md}) {
    padding-left: ${theme.spacing[4]};
    padding-right: ${theme.spacing[4]};
  }
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  gap: ${theme.spacing[4]};
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: ${theme.spacing[8]};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(0, 0, 0, 0.05),
    inset 0 0 40px rgba(0, 0, 0, 0.02);
  position: relative;
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
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.1),
      inset 0 0 40px rgba(0, 0, 0, 0.05);
  }

  @media (min-width: ${theme.breakpoints.md}) {
    width: 32rem;
  }
`;

export const ErrorMessage = styled.p`
  color: ${theme.colors.red[600]};
  font-size: ${theme.fontSizes.sm};
  margin: 0;
  text-align: center;
  width: 100%;
  background: rgba(239, 68, 68, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 16px;
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
    padding: ${theme.spacing[2]} ${theme.spacing[5]};
  }
`;
