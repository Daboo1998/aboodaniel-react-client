import React, { useContext } from "react";
import Link, { LinkProps } from "./Link";
import { PageNavigatorBarContext } from "../../molecules/general/PageNavigatorBar";
import styled from "styled-components";
import { media } from "../../../utils/media";
import useNavigation from "../../../hooks/useNavigation";

export interface PageNavigatorBarLinkProps extends LinkProps {}

const PageNavigatorBarLink: React.FC<PageNavigatorBarLinkProps> = ({
  to,
  children,
}) => {
  const pageNavigatorBar = useContext(PageNavigatorBarContext);
  const { currentPage } = useNavigation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    pageNavigatorBar.hide();
  };

  return (
    <StyledNavLink onClick={handleClick} to={to} $active={to === currentPage}>
      {children}
    </StyledNavLink>
  );
};

// ----------------------------- styled components ---------------------------

interface StyledProps {
  $active: boolean;
}

const StyledNavLink = styled(Link)<StyledProps>`
  display: block;
  padding: 0.5rem; /* p-2 */
  padding-top: 1.5rem; /* pt-6 */
  padding-bottom: 1.5rem; /* pb-6 */
  border-bottom: 1px solid black;
  background: ${({ $active, theme }) =>
    $active ? "#e5e7eb" : theme.colors.backgroundLight || "#f3f3f3"};

  ${media.up("md")}{
    border-bottom: none;
    padding: 1rem; /* p-4 */
    flex-shrink: 0;
    background: ${({ $active, theme }) =>
      $active ? "#e5e7eb" : theme.colors.backgroundLight || "#f3f3f3"};

    &:hover {
      background: #e5e7eb;
    }
  }
`;

export default PageNavigatorBarLink;
