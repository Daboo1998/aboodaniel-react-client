import styled from 'styled-components';
import { DangerButton } from '../shared.styled';

export { PopupContent, HeaderRow, CloseButton } from '../shared.styled';

export const DeleteButton = styled(DangerButton)`
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;

  svg {
    width: 0.9rem;
    height: 0.9rem;
    fill: var(--error);
    flex-shrink: 0;
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
