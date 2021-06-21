import React from "react";
import {TextInputProps} from "./TextInput";

export interface TextAreaInputProps extends TextInputProps {}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ name , children, value, onChange}) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        onChange?.(e.target.value);
    };

    return <div className="flex flex-row">
        <label htmlFor={name} className="p-1 mb-2">{children}</label>
        <textarea name={name} value={value} onChange={handleChange} className="border rounded border-black p-1" />
    </div>
};

export default TextAreaInput;