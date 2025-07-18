import React, { useMemo } from "react";
import { generateId } from "../../../utils/accessibility";
import {
  InputContainer,
  InputLabel,
  LabelText,
  RequiredAsterisk,
  StyledInput
} from "./TextInput.styled";

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
    const errorId = useMemo(() => generateId(`error-${name}`), [name]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        onChange?.(e.target.value);
    };

    return (
        <InputContainer>
            <InputLabel htmlFor={inputId}>
                <LabelText>
                    {label} {required && <RequiredAsterisk aria-label="required">*</RequiredAsterisk>}
                </LabelText>
                <StyledInput
                    id={inputId}
                    type={isPassword ? "password" : "text"}
                    value={value}
                    onChange={handleChange}
                    name={name}
                    placeholder={placeholder || ""}
                    required={required}
                    aria-required={required}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    autoComplete={autoComplete || (isPassword ? "current-password" : "off")}
                />
            </InputLabel>
            {error && (
                <span id={errorId} role="alert" style={{ color: 'red', fontSize: '0.875rem' }}>
                    {error}
                </span>
            )}
        </InputContainer>
    );
};

export default TextInput;