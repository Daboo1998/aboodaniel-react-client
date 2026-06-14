import styled from 'styled-components';

export const MessageContainer = styled.div`
  padding: 1rem 1.4rem;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: background 0.2s var(--ease, cubic-bezier(0.22, 1, 0.36, 1));

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--surface-2);
  }
`;

export const MessageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
`;

export const MessageName = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text);
`;

export const MessageTimestamp = styled.span`
  margin-left: auto;
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-3);
`;

export const MessageSubject = styled.p`
  margin: 0 0 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-2);
`;

export const MessagePreview = styled.p`
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.82rem;
  color: var(--text-3);
  line-height: 1.5;
`;
