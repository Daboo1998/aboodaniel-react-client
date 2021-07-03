import React from "react";
import {useHistory} from "react-router-dom";

export interface LinkProps {
    to: string,
    onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void,
    className?: string,
    onMouseEnter?: React.MouseEventHandler,
    onMouseLeave?: React.MouseEventHandler
}

const Link: React.FC<LinkProps> = ({ children, to, onClick, ...props }) => {
    const history = useHistory();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

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