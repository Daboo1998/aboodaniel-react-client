import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const RoleItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
  z-index: 1;

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
        rgba(255, 255, 255, 0.05) 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.02) 75%,
        transparent 100%
      ),
      /* Very subtle rainbow dispersion only at extreme edges */
        linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 0, 0, 0.004) 2%,
          rgba(255, 165, 0, 0.004) 3%,
          rgba(255, 255, 0, 0.004) 4%,
          rgba(0, 255, 0, 0.004) 5%,
          rgba(0, 255, 255, 0.004) 6%,
          rgba(0, 0, 255, 0.004) 7%,
          rgba(238, 130, 238, 0.004) 8%,
          transparent 10%,
          transparent 90%,
          rgba(238, 130, 238, 0.004) 92%,
          rgba(0, 0, 255, 0.004) 93%,
          rgba(0, 255, 255, 0.004) 94%,
          rgba(0, 255, 0, 0.004) 95%,
          rgba(255, 255, 0, 0.004) 96%,
          rgba(255, 165, 0, 0.004) 97%,
          rgba(255, 0, 0, 0.004) 98%,
          transparent 100%
        );
    pointer-events: none;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.05);
  }
`;

export const RoleHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing[4]};
  gap: ${theme.spacing[3]};
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  z-index: 1;

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.1);
    border-bottom-color: rgba(255, 255, 255, 0.05);
  }
`;

export const RoleCheckbox = styled.input`
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

export const RoleTitle = styled.h3`
  margin: 0;
  padding-left: ${theme.spacing[2]};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.white};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const UsersList = styled.ol`
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
`;

export const UserItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  gap: ${theme.spacing[2]};
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.08);
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.1);
    border-color: rgba(255, 255, 255, 0.02);

    &:hover {
      background: rgba(0, 0, 0, 0.2);
      border-color: rgba(255, 255, 255, 0.05);
    }
  }
`;

export const UserCheckbox = styled.input`
  width: ${theme.spacing[4]};
  height: ${theme.spacing[4]};
  cursor: pointer;
  accent-color: ${theme.colors.blue[400]};
  border-radius: 4px;

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const UserText = styled.p`
  margin: 0;
  padding-left: ${theme.spacing[2]};
  color: ${theme.colors.gray[200]};
  font-size: ${theme.fontSizes.sm};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[300]};
  }
`;
