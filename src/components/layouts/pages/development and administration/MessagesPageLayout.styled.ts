import styled from 'styled-components';

export const MessagesPageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(3rem, 7vw, 6rem) var(--gutter, 1.5rem);
`;

export const UnauthorizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const UnauthorizedTitle = styled.h1`
  margin: 0;
  color: var(--text);
  font-size: clamp(1.9rem, 4.2vw, 3.2rem);
  letter-spacing: -0.03em;
  font-weight: 600;
`;

export const UnauthorizedMessage = styled.p`
  margin: 0;
  color: var(--text-2);
  line-height: 1.6;
`;

export const MessagesTitle = styled.h1`
  margin: 1rem 0 2rem;
  color: var(--text);
  font-size: clamp(1.9rem, 4.2vw, 3.2rem);
  letter-spacing: -0.03em;
  font-weight: 600;
  line-height: 1.05;
`;

export const MessagesContainer = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg, 22px);
  overflow: hidden;
  transition: border-color 0.35s var(--ease, cubic-bezier(0.22, 1, 0.36, 1));

  &:hover {
    border-color: var(--border-2);
  }
`;

export const EmptyState = styled.div`
  padding: 3.5rem 1.4rem;
  text-align: center;
  color: var(--text-3);
  font-size: 0.9rem;
`;
