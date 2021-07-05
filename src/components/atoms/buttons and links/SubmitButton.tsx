import React from "react";

export enum SubmitButtonType {
    primary = "primary",
    destructive = "destructive",
    constructive = "constructive"
}

export interface SubmitButtonProps {
    label: string;
    onSubmit?: () => void;
    type?: SubmitButtonType;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({label, onSubmit, type = SubmitButtonType.primary}) => {
    const theme = () => {
        switch (type) {
            case SubmitButtonType.primary: return "bg-submit hover:bg-submit-hover";
            case SubmitButtonType.constructive: return "bg-green-600 hover:bg-green-900";
            case SubmitButtonType.destructive: return "bg-red-600 hover:bg-red-900";
        }
    };

    return (
        <button type="submit" onClick={_ => onSubmit?.()}
                className={`${theme()} text-white rounded py-3 px-5 uppercase w-full`}>
            {label}
        </button>
    );
};

export default SubmitButton;