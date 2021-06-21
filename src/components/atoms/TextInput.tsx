import React from "react";

export interface TextInputProps {
    name: string;
    value?: string;
    onChange?: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ name , children, value, onChange}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        onChange?.(e.target.value);
    };

    return <div className="flex flex-row">
        <label htmlFor={name} className="p-1 mb-2">{children}</label>
        <input type="text" value={value}  onChange={handleChange} name={name} className="border rounded border-black p-1 mb-2" />
    </div>;
};

export default TextInput;