import React from "react";
import useNavigation from "../../../hooks/useNavigation";
import { StyledLink } from "./Link.styled";

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
        <StyledLink {...props} onClick={handleClick}>
            {children}
        </StyledLink>
    );
};

export default Link;