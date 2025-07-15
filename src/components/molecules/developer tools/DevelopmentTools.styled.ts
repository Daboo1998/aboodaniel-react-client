import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const DevelopmentToolsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing[8]} ${theme.spacing[6]};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[6]} ${theme.spacing[4]};
  }
`;

export const DevelopmentToolsTitle = styled.h1`
  font-size: ${theme.fontSizes["3xl"]};
  color: ${theme.colors.white};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing[8]};
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: ${theme.spacing[6]};
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
`;

export const RolesListContainer = styled.div`
  margin-top: ${theme.spacing[6]};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: ${theme.spacing[6]};
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
`;

export const RolesListHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing[4]} ${theme.spacing[4]};
  gap: ${theme.spacing[4]};
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: ${theme.spacing[4]};
  position: relative;
  z-index: 1;

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.05);
  }
`;

export const RolesListTitle = styled.h2`
  margin: 0;
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.white};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const DeleteButton = styled.button`
  background: rgba(239, 68, 68, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  padding: ${theme.spacing[3]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;

  svg {
    width: ${theme.spacing[5]};
    height: ${theme.spacing[5]};
    fill: ${theme.colors.red[400]};
    transition: fill 0.2s ease;
  }

  &:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.3);
    box-shadow: 0 4px 16px rgba(239, 68, 68, 0.2);

    svg {
      fill: ${theme.colors.red[300]};
    }
  }

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.3);

    &:hover {
      background: rgba(239, 68, 68, 0.3);
      border-color: rgba(239, 68, 68, 0.4);
    }
  }
`;

export const RolesList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;
