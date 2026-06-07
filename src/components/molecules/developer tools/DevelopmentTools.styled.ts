import styled from "styled-components";

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

export const RolesPanel = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg, 22px);
  overflow: hidden;
  transition: border-color 0.35s var(--ease, cubic-bezier(0.22, 1, 0.36, 1));

  &:hover {
    border-color: var(--border-2);
  }
`;

export const RolesPanelHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.6rem 0.75rem;
  padding: 1rem 1.4rem;
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
`;

export const RolesPanelTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const RolesPanelActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const RolesPanelTitle = styled.h2`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
`;

export const SelectionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background: var(--accent-soft);
  color: var(--accent);
  border-radius: 999px;
  font-size: 0.72rem;
  font-family: var(--font-mono);
  padding: 0.15rem 0.55rem;
  white-space: nowrap;
`;

export const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  background: var(--error-bg);
  border: 1px solid var(--error-border);
  border-radius: var(--radius, 14px);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--error);
  transition: all 0.25s var(--ease, cubic-bezier(0.22, 1, 0.36, 1));
  white-space: nowrap;

  svg {
    width: 0.9rem;
    height: 0.9rem;
    fill: var(--error);
    flex-shrink: 0;
  }

  &:hover {
    background: var(--error-bg-hover);
    border-color: var(--error-border-hover);
  }

  &:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const RolesList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const EmptyState = styled.div`
  padding: 3.5rem 1.4rem;
  text-align: center;
  color: var(--text-3);
  font-size: 0.9rem;
`;
