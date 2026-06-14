import styled from 'styled-components';

export const StyledForm = styled.form`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const FormBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 1.25rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  .field { margin-bottom: 0; }
`;

export const OngoingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius, 14px);
  cursor: pointer;
`;

export const OngoingCheckbox = styled.input`
  width: 1.1rem;
  height: 1.1rem;
  cursor: pointer;
  accent-color: var(--accent);
  flex-shrink: 0;
`;

export const DateRow = styled.div`
  display: flex;
  gap: 0.75rem;

  > * { flex: 1; }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const RequiredNote = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: var(--text-3);

  .req { color: var(--error); }
`;
