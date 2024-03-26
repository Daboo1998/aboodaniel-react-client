import React, { useContext } from "react";
import Link, { LinkProps } from "./Link";
import { PageNavigatorBarContext } from "../../molecules/general/PageNavigatorBar";
import { cx } from "../../../utils";
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
    <Link
      to={to}
      className={cx(
        ">md:hover:bg-gray-200 >md:dark:hover:bg-black <md:border-b border-black p-2 pb-6 pt-6 >md:p-4 >md:flex-shrink-0",
        to === currentPage
          ? "bg-gray-200 dark:bg-black"
          : "bg-background-light dark:bg-background-dark"
      )}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default PageNavigatorBarLink;
