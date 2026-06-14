import React, { useMemo } from "react";
import { TextInputProps } from "./TextInput";
import { generateId } from "../../../utils/accessibility";

export interface TextAreaInputProps extends TextInputProps {
    rows?: number;
    maxLength?: number;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
    name,
    label,
    value,
    onChange,
    required,
    placeholder,
    error,
    rows = 5,
    maxLength
}) => {
    const inputId = useMemo(() => generateId(`textarea-${name}`), [name]);

    return (
        <div className={`field${error ? ' invalid' : ''}`}>
            <label htmlFor={inputId}>
                {label} {required && <span className="req" aria-label="required">*</span>}
            </label>
            <textarea
                id={inputId}
                name={name}
                value={value}
                rows={rows}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder || ""}
                required={required}
                aria-required={required}
                aria-invalid={!!error}
                maxLength={maxLength}
            />
            {error && <div className="field-error">{error}</div>}
        </div>
    );
};

export default TextAreaInput;
