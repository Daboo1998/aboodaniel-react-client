import React, {useContext, useEffect, useState} from "react";
import Link, {LinkProps} from "./Link";
import {PageNavigatorContext } from "../pageNavigator/PageNavigator";
import { PageNavigatorBarContext } from "../molecules/navigator/PageNavigatorBar";


export interface NavigationBarLinkProps extends LinkProps {
    pageTitle: string
}

const NavigationBarLink: React.FC<NavigationBarLinkProps> = ({to, children, pageTitle}) => {
    const [isHovered, setIsHovered] = useState(false);
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
        <Link to={to} className={`>md:border-r <md:border-b border-black p-2 pb-6 pt-6 >md:p-4
        bg-${(to === navigator.currentPath || isHovered) ? "gray-200" : "white"}`}
              onMouseEnter={(_) => setIsHovered(true)}
              onMouseLeave={(_) => setIsHovered(false)}
              onClick={handleClick}
        >
            {children}
        </Link>
    );
};

export default NavigationBarLink;