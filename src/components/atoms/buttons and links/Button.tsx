import React from "react";
import { StyledButton } from "./Button.styled";

export enum ButtonType {
    primary = "primary",
    destructive = "destructive",
    constructive = "constructive"
}

export enum ButtonSize {
    smallFullWidth = "smallFullWidth",
    mediumFullWidth = "mediumFullWidth",
    bigFullWidth = "bigFullWidth",
    small = "small",
    medium = "medium",
    big = "big"
}

export interface ButtonProps {
    label: string;
    action?: (e: any) => void;
    type?: ButtonType;
    size?: ButtonSize;
    className?: string;
    submit?: boolean;
    nonUppercase?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    nonUppercase, 
    submit = false, 
    className, 
    label, 
    action, 
    type = ButtonType.primary, 
    size = ButtonSize.small
}) => {
    return (
        <StyledButton 
            type={submit ? "submit" : "button"} 
            onClick={e => action?.(e)}
            $buttonType={type}
            $buttonSize={size}
            $nonUppercase={nonUppercase}
            className={className}
        >
            {label}
        </StyledButton>
    );
};

export default Button;