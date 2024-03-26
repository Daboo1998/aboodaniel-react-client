import styled from "styled-components";

export const FooterStyled = styled.div`
  display: none;

  &.Menu {
    display: flex;
    flex-grow: 1;
    justify-content: end;

    @media screen and (min-width: 768px) {
      display: none;
    }
  }

  @media screen and (min-width: 768px) {
    display: block;
  }
`;
