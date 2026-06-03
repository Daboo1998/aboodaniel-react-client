import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const DevelopmentToolsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(3rem, 7vw, 6rem) var(--gutter, 1.5rem);
`;

export const DevelopmentToolsTitle = styled.h1`
  font-size: clamp(1.9rem, 4.2vw, 3.2rem);
  letter-spacing: -0.03em;
  font-weight: 600;
  line-height: 1.05;
  margin: 1rem 0 2rem;
  color: var(--text);
`;

export const RolesListContainer = styled.div`
  margin-top: ${theme.spacing[4]};
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg, 22px);
  overflow: hidden;
  transition: border-color 0.35s var(--ease, cubic-bezier(0.22, 1, 0.36, 1));

  &:hover {
    border-color: var(--border-2);
  }
`;

export const RolesListHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing[4]};
  gap: ${theme.spacing[3]};
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
`;

export const RolesListTitle = styled.h2`
  margin: 0;
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: var(--text);
`;

export const DeleteButton = styled.button`
  background: oklch(0.6 0.2 25 / 0.08);
  border: 1px solid oklch(0.6 0.2 25 / 0.2);
  border-radius: 10px;
  padding: ${theme.spacing[2]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s var(--ease, cubic-bezier(0.22, 1, 0.36, 1));

  svg {
    width: ${theme.spacing[5]};
    height: ${theme.spacing[5]};
    fill: oklch(0.62 0.2 25);
    transition: fill 0.2s;
  }

  &:hover {
    background: oklch(0.6 0.2 25 / 0.15);
    border-color: oklch(0.6 0.2 25 / 0.35);
  }

  &:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const RolesList = styled.ul`
  padding: ${theme.spacing[3]};
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};
`;
