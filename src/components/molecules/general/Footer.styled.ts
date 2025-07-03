import styled from "styled-components";
import { media } from "../../../utils/media";

interface Props {
  $insideMenu: boolean;
}

export const FooterStyled = styled.div<Props>`
  display: ${({ $insideMenu }) => ($insideMenu ? "flex" : "block")};
  flex-grow: ${({ $insideMenu }) => ($insideMenu ? 1 : 0)};
  justify-content: ${({ $insideMenu }) => ($insideMenu ? "flex-end" : "initial")};
  flex-direction: column;
  background: ${({ theme }) => theme.colors.backgroundLight};
  padding-bottom: 1.5rem; /* pb-6 */
  gap: 1rem; /* space-y-4 */

  ${media.up("md")} {
    display: ${({ $insideMenu }) => ($insideMenu ? "none" : "block")};
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  flex-direction: row;
`;

export const IconLink = styled.a`
  padding: 0.5rem;
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AuthLinksWrapper = styled.div<{ $column: boolean }>`
  display: flex;
  flex-direction: ${({ $column }) => ($column ? "column" : "row")};
  gap: 0.5rem;
  align-items: center;
`;
