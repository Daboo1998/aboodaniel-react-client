import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: clamp(3rem, 7vw, 6rem) var(--gutter, 1.5rem);
`;

export const RegisterTitle = styled.h1`
  text-align: center;
  margin: 1rem 0 2rem;
  color: var(--text);
  font-size: clamp(1.9rem, 4.2vw, 3.2rem);
  letter-spacing: -0.03em;
  font-weight: 600;
  line-height: 1.05;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 32rem;
  gap: 0.75rem;
  align-items: stretch;
  padding: clamp(1.8rem, 4vw, 2.8rem);

  .field {
    margin-bottom: 0.55rem;
  }
`;

export const ErrorMessage = styled.p`
  color: var(--error);
  font-size: ${theme.fontSizes.sm};
  margin: 0;
  text-align: center;
  width: 100%;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  background: var(--error-bg);
  border: 1px solid var(--error-border);
  border-radius: 8px;
`;

export const SubmitButtonContainer = styled.div`
  width: 100%;

  .btn {
    width: 100%;
    justify-content: center;
  }
`;
