import styled from "styled-components";

export const PageStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.5rem;
  background-color: #f3f3f3;
  padding-top: 5rem;
  flex-grow: 1;

  @media (prefers-color-scheme: dark) {
    background-color: #1f1f1f;
  }
`;
