import styled from 'styled-components';

export const PopupContent = styled.div<{ $maxWidth?: string }>`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg, 22px);
  overflow: hidden;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth ?? '560px'};
  max-height: calc(100vh - 40px);
  max-height: calc(100svh - 40px);
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    max-width: calc(100vw - 24px);
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.25rem;
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
`;

export const HeaderTitle = styled.h3`
  flex: 1;
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.35rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s var(--ease, cubic-bezier(0.22, 1, 0.36, 1));

  svg {
    width: 1.1rem;
    height: 1.1rem;
    fill: var(--text-3);
    transition: fill 0.2s;
  }

  &:hover {
    background: var(--border);
    svg { fill: var(--text); }
  }

  &:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const ErrorMessage = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: var(--error);
  background: var(--error-bg);
  border: 1px solid var(--error-border);
  border-radius: 10px;
  padding: 0.55rem 0.75rem;

  &:empty { display: none; }
`;

export const PopupFooter = styled.div`
  padding: 1rem 1.4rem;
  border-top: 1px solid var(--border);
  background: var(--surface-2);
  flex-shrink: 0;
  display: flex;
  gap: 0.5rem;

  > button { flex: 1; justify-content: center; }
`;

export const SelectList = styled.ul`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  list-style: none;
  margin: 0;
  padding: 0.75rem 0;
`;

export const SelectItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1.4rem;
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: var(--surface-2); }
`;

export const SelectCheckbox = styled.input`
  width: 1.1rem;
  height: 1.1rem;
  cursor: pointer;
  accent-color: var(--accent);
  flex-shrink: 0;
`;

export const SelectLabel = styled.span`
  font-size: 0.88rem;
  color: var(--text-2);
  font-family: var(--font-mono);
`;

export const DangerButton = styled.button.attrs({ className: 'btn' })`
  background: var(--error-bg);
  color: var(--error);
  border-color: var(--error-border);
  box-shadow: none;

  &:hover {
    background: var(--error-bg-hover);
    border-color: var(--error-border-hover);
    transform: translateY(-1px);
    box-shadow: none;
  }

  &:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
`;
