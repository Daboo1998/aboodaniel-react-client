import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const RoleItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius, 14px);
  overflow: hidden;
  transition: border-color 0.35s var(--ease, cubic-bezier(0.22, 1, 0.36, 1));

  &:hover {
    border-color: var(--border-2);
  }
`;

export const RoleHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  gap: ${theme.spacing[3]};
  border-bottom: 1px solid var(--border);
`;

export const RoleCheckbox = styled.input`
  width: ${theme.spacing[5]};
  height: ${theme.spacing[5]};
  cursor: pointer;
  accent-color: var(--accent);

  &:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const RoleTitle = styled.h3`
  margin: 0;
  padding-left: ${theme.spacing[2]};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  color: var(--text);
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
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  transition: border-color 0.25s var(--ease, cubic-bezier(0.22, 1, 0.36, 1));

  &:hover {
    border-color: var(--border-2);
  }
`;

export const UserCheckbox = styled.input`
  width: ${theme.spacing[4]};
  height: ${theme.spacing[4]};
  cursor: pointer;
  accent-color: var(--accent);

  &:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const UserText = styled.p`
  margin: 0;
  padding-left: ${theme.spacing[2]};
  color: var(--text-2);
  font-size: ${theme.fontSizes.sm};
`;
