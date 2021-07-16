import React from "react";
import {TextInputProps} from "./TextInput";

export interface TextAreaInputProps extends TextInputProps {
    rows?: number,
    automaticHeight?: boolean,
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
    name ,
    label,
    value,
    onChange,
    required,
    rows = 10,
    automaticHeight,
    placeholder
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        onChange?.(e.target.value);

        if (automaticHeight) {
            e.target.style.height = "1px";
            e.target.style.height = (e.target.scrollHeight)+"px";
        }
    };

    return <p className="text-gray-800 font-sans font-bold w-full">
        <label htmlFor={name} className="mb-2"><p>{label} {required && <span className="text-red-600">*</span>}</p>
            <textarea
                placeholder={placeholder}
                name={name} value={value} rows={automaticHeight ? 1 : rows} aria-invalid onChange={handleChange}
                      className="border rounded-md border-gray-200 transition box-shadow-inner py-2 px-4 mb-2 w-full"
            />
        </label>
    </p>
};

export default TextAreaInput;