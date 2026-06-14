import React, { useMemo } from "react";
import { generateId } from "../../../utils/accessibility";

export interface DateInputProps {
    name: string;
    value?: string;
    onChange?: (value: string) => void;
    label: string;
    required?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
    name,
    label,
    value,
    onChange,
    required
}) => {
    const inputId = useMemo(() => generateId(`date-${name}`), [name]);

    return (
        <div className="field">
            <label htmlFor={inputId}>
                {label} {required && <span className="req" aria-label="required">*</span>}
            </label>
            <input
                id={inputId}
                type="date"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                name={name}
                required={required}
                aria-required={required}
            />
        </div>
    );
};

export default DateInput;
