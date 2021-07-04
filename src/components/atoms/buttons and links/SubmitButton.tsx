import React from "react";

export interface SubmitButtonProps {
    label: string;
    onSubmit?: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({label, onSubmit}) => (
    <button type="submit" onClick={_ => onSubmit?.()} className="bg-submit text-white rounded py-3 px-5 uppercase w-full hover:bg-submit-hover">
        {label}
    </button>
);

export default SubmitButton;