import React, {useContext, useEffect} from "react";
import Link, {LinkProps} from "./Link";
import { PageNavigatorBarContext } from "../molecules/navigator/PageNavigatorBar";
import { useHistory } from 'react-router-dom'

export interface PageNavigatorBarLinkProps extends LinkProps {
    pageTitle: string
}

const PageNavigatorBarLink: React.FC<PageNavigatorBarLinkProps> = ({to, children, pageTitle}) => {
    const pageNavigatorBar = useContext(PageNavigatorBarContext);
    const history = useHistory();

    const handleClick = (e: React.MouseEvent) => {
        pageNavigatorBar.hide();
        pageNavigatorBar.setCurrentTitle(pageTitle);
    };

    useEffect(() => {
        if (pageNavigatorBar.currentTitle !== pageTitle && to === history.location.pathname) {
            pageNavigatorBar.setCurrentTitle(pageTitle);
        }
    });

    return (
        <Link to={to}
              className = {
                "bg-white hover:bg-gray-200 >md:border-r <md:border-b border-black p-2 pb-6 pt-6 >md:p-4 >md:flex-shrink-0" +
                ((to === history.location.pathname) ? " bg-gray-200" : "")
              }
              onClick={handleClick}
        >
            {children}
        </Link>
    );
};

export default PageNavigatorBarLink;
