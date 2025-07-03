import React from "react";
import styled, { css } from "styled-components";
import { media } from "../../../utils/media";

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

interface StyledButtonProps {
    $btnType: ButtonType;
    $size: ButtonSize;
    $nonUppercase?: boolean;
}

const sizeStyles = {
    [ButtonSize.small]: css``,
    [ButtonSize.medium]: css`
        padding: 0.5rem;
    `,
    [ButtonSize.big]: css`
        padding: 0.5rem 1.25rem;
    `,
    [ButtonSize.smallFullWidth]: css`
        width: 100%;
    `,
    [ButtonSize.mediumFullWidth]: css`
        width: 100%;
        padding: 0.5rem;
    `,
    [ButtonSize.bigFullWidth]: css`
        width: 100%;
        padding: 0.5rem 1.25rem;
    `,
};

const typeStyles = {
    [ButtonType.primary]: css`
        background: ${({ theme }) => theme.colors.gray600};
        ${media.up("md")} {
            &:hover {
                background: ${({ theme }) => theme.colors.gray900};
            }
        }
    `,
    [ButtonType.constructive]: css`
        background: ${({ theme }) => theme.colors.green600};
        ${media.up("md")} {
            &:hover {
                background: ${({ theme }) => theme.colors.green900};
            }
        }
    `,
    [ButtonType.destructive]: css`
        background: ${({ theme }) => theme.colors.red600};
        ${media.up("md")} {
            &:hover {
                background: ${({ theme }) => theme.colors.red900};
            }
        }
    `,
};

const StyledButton = styled.button<StyledButtonProps>`
    color: #ffffff;
    border: none;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    ${({ $nonUppercase }) => !$nonUppercase && css`text-transform: uppercase;`}

    ${({ $size }) => sizeStyles[$size]}
    ${({ $btnType }) => typeStyles[$btnType]}
`;

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
    nonUppercase = false,
    submit = false,
    className,
    label,
    action,
    type = ButtonType.primary,
    size = ButtonSize.small,
}) => {
    return (
        <StyledButton
            type={submit ? "submit" : undefined}
            onClick={(e) => action?.(e)}
            $btnType={type}
            $size={size}
            $nonUppercase={nonUppercase}
            className={className}
        >
            {label}
        </StyledButton>
    );
};

export default Button;