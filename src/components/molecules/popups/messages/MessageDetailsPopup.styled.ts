import styled from 'styled-components';

export const PopupContent = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg, 22px);
  overflow: hidden;
  width: 100%;
  max-width: 560px;
  max-height: calc(100vh - 40px);
  max-height: calc(100svh - 40px);
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    max-width: calc(100vw - 24px);
    border-radius: var(--radius-lg, 22px);
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

export const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  background: oklch(0.6 0.2 25 / 0.08);
  border: 1px solid oklch(0.6 0.2 25 / 0.22);
  border-radius: 10px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 500;
  color: oklch(0.62 0.2 25);
  transition: all 0.25s var(--ease, cubic-bezier(0.22, 1, 0.36, 1));

  svg {
    width: 0.9rem;
    height: 0.9rem;
    fill: oklch(0.62 0.2 25);
    flex-shrink: 0;
  }

  &:hover {
    background: oklch(0.6 0.2 25 / 0.15);
    border-color: oklch(0.6 0.2 25 / 0.4);
  }

  &:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const MessageDetails = styled.div`
  padding: 1.25rem 1.4rem 1rem;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
`;

export const MessageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const MessageSubject = styled.h4`
  flex: 1;
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
  line-height: 1.3;
`;

export const MessageTimestamp = styled.span`
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-3);
  margin-top: 0.25rem;
`;

export const MessageInfo = styled.p`
  margin: 0.35rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: var(--text-3);
`;

export const MessageInfoHighlight = styled.span`
  color: var(--text-2);
`;

export const MessageContent = styled.p`
  padding: 1.25rem 1.4rem;
  white-space: pre-wrap;
  margin: 0;
  line-height: 1.7;
  color: var(--text-2);
  font-size: 0.95rem;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export const ReplyButton = styled.div`
  padding: 1rem 1.4rem;
  border-top: 1px solid var(--border);
  background: var(--surface-2);
  flex-shrink: 0;
`;
