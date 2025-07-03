import React from "react";
import styled from "styled-components";
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
        <StyledButton {...props} onClick={handleClick}>
            {children}
        </StyledButton>
    );
};

// basic unstyled button wrapper (inherit color etc.). Extra className still supported via props.
const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font: inherit;
`;

export default Link;