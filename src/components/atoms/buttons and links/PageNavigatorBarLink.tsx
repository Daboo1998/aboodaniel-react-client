import React, { useContext } from "react";
import { LinkProps } from "./Link";
import { PageNavigatorBarContext } from "../../molecules/general/PageNavigatorBar";
import useNavigation from "../../../hooks/useNavigation";
import { StyledPageNavigatorBarLink } from "./PageNavigatorBarLink.styled";

export interface PageNavigatorBarLinkProps extends LinkProps {}

const PageNavigatorBarLink: React.FC<PageNavigatorBarLinkProps> = ({
  to,
  children,
}) => {
  const pageNavigatorBar = useContext(PageNavigatorBarContext);
  const { currentPage } = useNavigation();
  const navigation = useNavigation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    pageNavigatorBar.hide();
    navigation.navigateTo(to);
  };

  const isActive = to === currentPage;

  return (
    <StyledPageNavigatorBarLink 
      $isActive={isActive}
      onClick={handleClick}
    >
      {children}
    </StyledPageNavigatorBarLink>
  );
};

export default PageNavigatorBarLink;
