import React, { useMemo } from "react";
import { generateId } from "../../../utils/accessibility";

export interface TextInputProps {
    name: string;
    value?: string;
    onChange?: (value: string) => void;
    isPassword?: boolean;
    label: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    autoComplete?: string;
}

const TextInput: React.FC<TextInputProps> = ({
    name,
    label,
    value,
    onChange,
    isPassword,
    placeholder,
    required,
    error,
    autoComplete
}) => {
    const inputId = useMemo(() => generateId(`input-${name}`), [name]);

    return (
        <div className={`field${error ? ' invalid' : ''}`}>
            <label htmlFor={inputId}>
                {label} {required && <span className="req" aria-label="required">*</span>}
            </label>
            <input
                id={inputId}
                type={isPassword ? "password" : "text"}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                name={name}
                placeholder={placeholder || ""}
                required={required}
                aria-required={required}
                aria-invalid={!!error}
                autoComplete={autoComplete || (isPassword ? "current-password" : "off")}
            />
            {error && <div className="field-error">{error}</div>}
        </div>
    );
};

export default TextInput;
