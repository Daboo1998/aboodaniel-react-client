import React from "react";

export interface SubmitButtonProps {
    label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({label}) => (
    <button type="submit" className="bg-submit text-white rounded py-3 px-5 uppercase w-full hover:bg-submit-hover">
        {label}
    </button>
);

export default SubmitButton;