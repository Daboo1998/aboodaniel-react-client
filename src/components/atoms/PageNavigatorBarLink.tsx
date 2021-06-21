import React, {useContext, useEffect} from "react";
import Link, {LinkProps} from "./Link";
import {PageNavigatorContext } from "../pageNavigator/PageNavigator";
import { PageNavigatorBarContext } from "../molecules/navigator/PageNavigatorBar";


export interface PageNavigatorBarLinkProps extends LinkProps {
    pageTitle: string
}

const PageNavigatorBarLink: React.FC<PageNavigatorBarLinkProps> = ({to, children, pageTitle}) => {
    const navigator = useContext(PageNavigatorContext);
    const pageNavigatorBar = useContext(PageNavigatorBarContext);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        pageNavigatorBar.hide();
        navigator.changeTitle(pageTitle);
    };

    useEffect(() =>{
        navigator.addPath(to);
    });

    return (
        <Link to={to}
              className = {
                "bg-white hover:bg-gray-200 >md:border-r <md:border-b border-black p-2 pb-6 pt-6 >md:p-4" +
                ((to === navigator.currentPath) ? " bg-gray-200" : "")
              }
              onClick={handleClick}
        >
            {children}
        </Link>
    );
};

export default PageNavigatorBarLink;