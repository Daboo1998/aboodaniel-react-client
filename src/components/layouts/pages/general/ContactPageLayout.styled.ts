import styled, { keyframes } from 'styled-components';

const msgIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
`;

export const ContactPageWrapper = styled.div`
  max-width: var(--maxw);
  margin-inline: auto;
  padding-inline: var(--gutter);
  padding-top: clamp(3rem, 7vw, 6rem);
  padding-bottom: clamp(4rem, 8vw, 7rem);
`;

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(2.5rem, 6vw, 5rem);
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const ContactLeft = styled.div``;

export const ContactKicker = styled.span`
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.4rem;

  &::before {
    content: "";
    width: 1.6rem;
    height: 1px;
    background: var(--border-2);
    display: inline-block;
  }
`;

export const ContactKickerIdx = styled.span`
  color: var(--accent);
`;

export const ContactHeading = styled.h1`
  font-size: clamp(2.4rem, 6vw, 4rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--text);
`;

export const ContactLead = styled.p`
  font-size: clamp(1.05rem, 1.6vw, 1.3rem);
  color: var(--text-2);
  line-height: 1.55;
  max-width: 60ch;
  margin-top: 1.4rem;
`;

export const ContactStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 2rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-2);
  border: 1px solid var(--border-2);
  border-radius: 999px;
  padding: 0.5rem 1rem;
  background: var(--surface);
`;

export const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: oklch(0.72 0.17 150);
  flex-shrink: 0;
`;

export const ContactMethods = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Method = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid var(--border);
  color: var(--text);
  text-decoration: none;
  transition: padding 0.3s var(--ease);

  &:hover { padding-left: 0.6rem; }
  &:hover .m-ico { border-color: var(--accent); color: var(--accent); }
`;

export const MethodIco = styled.span`
  width: 38px;
  height: 38px;
  border-radius: 11px;
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  color: var(--text-2);
  flex-shrink: 0;
  transition: border-color 0.3s, color 0.3s;
`;

export const MethodText = styled.span`
  display: flex;
  flex-direction: column;
`;

export const MethodLabel = styled.span`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-3);
`;

export const MethodValue = styled.span`
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.1rem;
  color: var(--text);
`;

/* Form card */
export const FormCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: clamp(1.8rem, 4vw, 2.8rem);
`;

export const FormField = styled.div<{ $invalid?: boolean }>`
  margin-bottom: 1.3rem;

  label {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-2);
    margin-bottom: 0.55rem;

    span.req { color: var(--accent); }
  }

  input, textarea {
    width: 100%;
    font-family: var(--font-sans);
    font-size: 1rem;
    color: var(--text);
    background: var(--bg);
    border: 1px solid ${({ $invalid }) => $invalid ? 'oklch(0.6 0.2 25)' : 'var(--border-2)'};
    border-radius: 12px;
    padding: 0.85rem 1rem;
    outline: none;
    transition: border-color 0.25s, box-shadow 0.25s;

    &::placeholder { color: var(--text-3); }
    &:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-soft);
    }
  }

  textarea {
    resize: vertical;
    min-height: 130px;
    line-height: 1.6;
  }
`;

export const FieldError = styled.div`
  color: oklch(0.62 0.2 25);
  font-size: 0.8rem;
  margin-top: 0.4rem;
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const FormFoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

export const ReqNote = styled.span`
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--text-3);

  span { color: var(--accent); }
`;

export const SubmitBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.95rem 1.8rem;
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
  background: var(--accent);
  color: oklch(0.99 0 0);
  box-shadow: 0 6px 22px var(--accent-glow);
  transition: background 0.3s var(--ease), transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
  white-space: nowrap;

  &:hover {
    background: var(--accent-2);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px var(--accent-glow);
  }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

/* Success state */
export const FormSuccess = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: clamp(2.5rem, 6vw, 4rem) 1.5rem;
  gap: 1rem;
  animation: ${msgIn} 0.5s var(--ease) both;
`;

export const SuccessRing = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--accent-soft);
  display: grid;
  place-items: center;
  color: var(--accent);
  margin-bottom: 0.5rem;
`;

export const SuccessTitle = styled.h3`
  font-size: 1.5rem;
  letter-spacing: -0.02em;
  color: var(--text);
`;

export const SuccessDesc = styled.p`
  color: var(--text-2);
  max-width: 38ch;
`;

export const BackHomeBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  border: 1px solid var(--border-2);
  cursor: pointer;
  background: transparent;
  color: var(--text);
  transition: border-color 0.3s var(--ease), transform 0.3s var(--ease);
  margin-top: 0.6rem;

  &:hover {
    border-color: var(--text);
    transform: translateY(-2px);
  }
`;
