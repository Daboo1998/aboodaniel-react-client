import {history, PageNavigatorContext } from "../pageNavigator/PageNavigator";
import React, {useContext} from "react";

export interface LinkProps {
    to: string,
    onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void,
    className?: string,
    onMouseEnter?: React.MouseEventHandler,
    onMouseLeave?: React.MouseEventHandler
}

const Link: React.FC<LinkProps> = ({ children, to, onClick, ...props }) => {
    const { currentPath } = useContext(PageNavigatorContext);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (currentPath === to) {
            // If it's not a valid path function will not trigger.
            return;
        }
        if (onClick) {
            onClick(e);
        }
        history.push(to);
    };

    return (
        <>
            <button {...props} onClick={handleClick}>
                {children}
            </button>
        </>
    );
};

export default Link;