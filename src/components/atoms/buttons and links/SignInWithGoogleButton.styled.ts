import styled from 'styled-components';

export const GoogleSignInButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.65rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius, 14px);
  width: 100%;
  background: var(--surface-2);
  cursor: pointer;
  transition: border-color 0.25s var(--ease, cubic-bezier(0.22, 1, 0.36, 1)),
              background 0.25s var(--ease, cubic-bezier(0.22, 1, 0.36, 1));
  font-family: inherit;
  font-size: 0.95rem;

  &:hover {
    border-color: var(--border-2);
    background: var(--surface);
  }

  &:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const GoogleIcon = styled.img`
  width: 1.2rem;
  flex-shrink: 0;
`;

export const ButtonText = styled.p`
  flex-shrink: 0;
  font-weight: 400;
  margin: 0;
  color: var(--text);
`;
