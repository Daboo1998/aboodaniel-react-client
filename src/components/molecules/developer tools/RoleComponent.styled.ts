import styled from "styled-components";

export const RoleRow = styled.li`
  list-style: none;
  border-bottom: 1px solid var(--border);
  transition: background 0.2s var(--ease, cubic-bezier(0.22, 1, 0.36, 1));

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--surface-2);
  }
`;

export const RoleRowHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.9rem 1.4rem;
  gap: 0.7rem;
`;

export const RoleCheckbox = styled.input`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  accent-color: var(--accent);
  flex-shrink: 0;

  &:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const RoleName = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
`;

export const UserCountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background: var(--accent-soft);
  color: var(--accent);
  border-radius: 999px;
  font-size: 0.72rem;
  font-family: var(--font-mono);
  padding: 0.15rem 0.5rem;
  white-space: nowrap;
`;

export const Flex1 = styled.span`
  flex: 1;
`;

export const UsersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0 1.4rem 0.9rem 3.1rem;
`;

export const UserPill = styled.label<{ $checked: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  border: 1px solid ${({ $checked }) => $checked ? 'oklch(0.6 0.2 25 / 0.35)' : 'var(--border)'};
  background: ${({ $checked }) => $checked ? 'oklch(0.6 0.2 25 / 0.08)' : 'transparent'};
  font-size: 0.8rem;
  color: ${({ $checked }) => $checked ? 'oklch(0.62 0.2 25)' : 'var(--text-2)'};
  cursor: pointer;
  transition: all 0.2s var(--ease, cubic-bezier(0.22, 1, 0.36, 1));

  &:hover {
    border-color: ${({ $checked }) => $checked ? 'oklch(0.6 0.2 25 / 0.5)' : 'var(--border-2)'};
    color: ${({ $checked }) => $checked ? 'oklch(0.62 0.2 25)' : 'var(--text)'};
  }
`;

export const UserCheckbox = styled.input`
  width: 0.75rem;
  height: 0.75rem;
  cursor: pointer;
  accent-color: oklch(0.62 0.2 25);
  flex-shrink: 0;
`;
