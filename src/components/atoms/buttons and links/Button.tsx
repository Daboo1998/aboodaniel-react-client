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
    disabled?: boolean;
    loading?: boolean;
    ariaLabel?: string;
    ariaDescribedBy?: string;
}

const Button: React.FC<ButtonProps> = ({
    nonUppercase, 
    submit = false, 
    className, 
    label, 
    action, 
    type = ButtonType.primary, 
    size = ButtonSize.small,
    disabled = false,
    loading = false,
    ariaLabel,
    ariaDescribedBy
}) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled && !loading) {
            action?.(e);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        // Prevent space key from scrolling the page
        if (e.key === ' ') {
            e.preventDefault();
        }
    };

    return (
        <StyledButton 
            type={submit ? "submit" : "button"} 
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            $buttonType={type}
            $buttonSize={size}
            $nonUppercase={nonUppercase}
            className={className}
            disabled={disabled || loading}
            aria-label={ariaLabel || label}
            aria-describedby={ariaDescribedBy}
            aria-busy={loading}
            aria-disabled={disabled || loading}
        >
            {loading ? "Loading..." : label}
        </StyledButton>
    );
};

export default Button;