import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: clamp(3rem, 7vw, 6rem) var(--gutter, 1.5rem);
`;

export const LoginTitle = styled.h1`
  text-align: center;
  margin: 1rem 0 2rem;
  color: var(--text);
  font-size: clamp(1.9rem, 4.2vw, 3.2rem);
  letter-spacing: -0.03em;
  font-weight: 600;
  line-height: 1.05;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 32rem;
  gap: ${theme.spacing[4]};
  align-items: stretch;
  padding: clamp(1.8rem, 4vw, 2.8rem);
`;

export const ErrorMessage = styled.p`
  color: oklch(0.62 0.2 25);
  font-size: ${theme.fontSizes.sm};
  margin: 0;
  text-align: center;
  width: 100%;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  background: oklch(0.6 0.2 25 / 0.1);
  border: 1px solid oklch(0.6 0.2 25 / 0.2);
  border-radius: 8px;
`;

export const SubmitButtonContainer = styled.div`
  width: 100%;
  margin-top: ${theme.spacing[2]};

  .btn {
    width: 100%;
    justify-content: center;
  }
`;

export const RegisterLinkContainer = styled.div`
  text-align: center;

  button {
    color: var(--accent);
    text-decoration: underline;
    background: none;
    border: none;
    padding: ${theme.spacing[1]};
    cursor: pointer;
    font-family: inherit;
    font-size: 0.95rem;
    transition: color 0.25s;

    &:hover {
      color: var(--accent-2);
    }
  }
`;
