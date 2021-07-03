import React from "react";

export interface AddButtonProps {
    onClick: () => void;
    text: string;
}

const AddButton: React.FC<AddButtonProps> = ({onClick, text}) => (
    <button
        className="border border-black p-1 m-1 rounded bg-green-600"
        onClick={_ => onClick()}
    >
        <p className="text-white">{text}</p>
    </button>
);

export default AddButton;