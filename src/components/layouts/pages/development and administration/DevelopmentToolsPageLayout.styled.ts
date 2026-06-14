import styled from "styled-components";

export const UnauthorizedContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(3rem, 7vw, 6rem) var(--gutter, 1.5rem);
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
  line-height: 1.05;
`;

export const UnauthorizedMessage = styled.p`
  margin: 0;
  color: var(--text-2);
  line-height: 1.6;
`;
