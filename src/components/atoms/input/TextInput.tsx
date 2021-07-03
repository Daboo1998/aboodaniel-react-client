import React from "react";

export interface TextInputProps {
    name: string;
    value?: string;
    onChange?: (value: string) => void;
    isPassword?: boolean;
    label: string;
}

const TextInput: React.FC<TextInputProps> = ({
    name ,
    label,
    value,
    onChange,
    isPassword
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        onChange?.(e.target.value);
    };

    return <p className="text-gray-800 font-sans font-bold w-full">
        <label htmlFor={name} className="mb-2">
            {label}<br/>
            <input type={isPassword ? "password" : "text"} value={value} aria-invalid onChange={handleChange} name={name}
                   className="border rounded transition border-gray-200 box-shadow-inner py-2 px-4 mb-2 >md:w-96 <md:w-full" />
        </label>
    </p>;
};

export default TextInput;