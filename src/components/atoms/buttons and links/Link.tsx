import React from "react";
import useNavigation from "../../../hooks/useNavigation";

export interface LinkProps {
    to: string,
    onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void,
    className?: string,
    onMouseEnter?: React.MouseEventHandler,
    onMouseLeave?: React.MouseEventHandler
}

const Link: React.FC<LinkProps> = ({
    children,
    to,
    onClick,
    ...props
}) => {
    const navigation = useNavigation();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (onClick) {
            onClick(e);
        }

        navigation.navigateTo(to);
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