import React, { useMemo } from "react";
import { generateId } from "../../../utils/accessibility";

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
    name,
    label,
    value,
    onChange,
    placeholder,
    required
}) => {
    const inputId = useMemo(() => generateId(`number-${name}`), [name]);

    return (
        <div className="field">
            <label htmlFor={inputId}>
                {label} {required && <span className="req" aria-label="required">*</span>}
            </label>
            <input
                id={inputId}
                type="number"
                value={value}
                onChange={(e) => onChange?.(e.target.valueAsNumber)}
                name={name}
                placeholder={placeholder || ""}
                min={min}
                max={max}
                required={required}
                aria-required={required}
            />
        </div>
    );
};

export default NumberInput;
