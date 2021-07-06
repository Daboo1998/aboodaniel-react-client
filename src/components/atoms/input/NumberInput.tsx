import React from "react";

export interface NumberInputProps {
    name: string;
    value?: number;
    onChange?: (value: number) => void;
    label: string;
    placeholder?: string;
    min: number;
    max: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
    min,
    max,
    name ,
    label,
    value,
    onChange,
    placeholder
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        onChange?.(e.target.valueAsNumber);
    };

    return <p className="text-gray-800 font-sans font-bold w-full">
        <label htmlFor={name} className="mb-2">
            {label}<br/>
            <input type="number" value={value} aria-invalid onChange={handleChange} name={name}
                   placeholder={placeholder ? placeholder : ""}
                   min={min}
                   max={max}
                   className="border rounded transition border-gray-200 box-shadow-inner py-2 px-4 mb-2 w-full" />
        </label>
    </p>;
};

export default NumberInput;