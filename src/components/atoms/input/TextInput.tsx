import React from "react";

export interface TextInputProps {
    name: string;
    value?: string;
    onChange?: (value: string) => void;
    isPassword?: boolean;
    label: string;
    placeholder?: string;
    required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
    name ,
    label,
    value,
    onChange,
    isPassword,
    placeholder,
    required
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        onChange?.(e.target.value);
    };

    return <p className="text-gray-800 font-sans font-bold w-full">
        <label htmlFor={name} className="mb-2">
            <p>{label} {required && <span className="text-red-600">*</span>}</p><br/>
            <input type={isPassword ? "password" : "text"} value={value} aria-invalid onChange={handleChange} name={name}
                   placeholder={placeholder ? placeholder : ""}
                   className="border rounded transition border-gray-200 box-shadow-inner py-2 px-4 mb-2 w-full" />
        </label>
    </p>;
};

export default TextInput;