import React from "react";

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
}

const Button: React.FC<ButtonProps> = ({submit = false, className, label, action, type = ButtonType.primary, size = ButtonSize.small}) => {
    const theme = () => {
        switch (type) {
            case ButtonType.primary: return "bg-gray-600 hover:bg-gray-900";
            case ButtonType.constructive: return "bg-green-600 hover:bg-green-900";
            case ButtonType.destructive: return "bg-red-600 hover:bg-red-900";
        }
    };

    const sizeAttributes = () => {
        switch(size) {
            case ButtonSize.bigFullWidth: return "w-full px-5 py-2";
            case ButtonSize.big: return "px-5 py-2";
            case ButtonSize.mediumFullWidth: return "w-full p-2";
            case ButtonSize.medium: return "p-2";
            case ButtonSize.smallFullWidth: return "w-full";
            case ButtonSize.small: return "";
        }
    };

    return (
        <button type={submit ? "submit": undefined} onClick={e => action?.(e)}
                className={`${theme()} ${sizeAttributes()} ${className ? className : ""} text-white rounded px-1 uppercase`}>
            {label}
        </button>
    );
};

export default Button;