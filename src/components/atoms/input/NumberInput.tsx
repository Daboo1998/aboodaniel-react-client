import React from "react";

export interface NumberInputProps {
    name: string;
    value?: number;
    onChange?: (value: number) => void;
    label: string;
    placeholder?: string;
    min: number;
    max: number;
    required?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
    min,
    max,
    name ,
    label,
    value,
    onChange,
    placeholder,
    required
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        onChange?.(e.target.valueAsNumber);
    };

    return <p className="text-gray-800 font-sans font-bold w-full">
        <label htmlFor={name} className="mb-2">
            <p>{label} {required && <span className="text-red-600">*</span>}</p>
            <input type="number" value={value} aria-invalid onChange={handleChange} name={name}
                   placeholder={placeholder ? placeholder : ""}
                   min={min}
                   max={max}
                   className="border rounded transition border-gray-200 box-shadow-inner py-2 px-4 mb-2 w-full" />
        </label>
    </p>;
};

export default NumberInput;