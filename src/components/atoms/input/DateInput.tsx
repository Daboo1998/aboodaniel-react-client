import React from "react";

export interface DateInputProps {
    name: string;
    value?: string;
    onChange?: (value: string) => void;
    label: string;
    required?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
    name ,
    label,
    value,
    onChange,
    required
}) => {

    return <p className="text-gray-800 font-sans font-bold w-full">
        <label htmlFor={name} className="mb-2">
            <p className="w-max">{label} {required && <span className="text-red-600">*</span>} </p><br/>
            <input value={value} onChange={e => onChange?.(e.target.value)} name={name}
                   type="date"
                   className="border rounded transition border-gray-200 box-shadow-inner py-2 px-4 mb-2 w-full" />
        </label>
    </p>;
};

export default DateInput;