import styled from 'styled-components';

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
`;

export const StyledCheckbox = styled.input`
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

export const CheckboxLabel = styled.p`
  margin: 0;
  cursor: pointer;
  user-select: none;
  color: var(--text-2);
  font-size: 0.9rem;
`;
