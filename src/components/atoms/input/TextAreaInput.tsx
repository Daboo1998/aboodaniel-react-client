import React, { useMemo } from "react";
import { TextInputProps } from "./TextInput";
import { generateId } from "../../../utils/accessibility";
import {
  TextAreaInputContainer,
  TextAreaInputLabel,
  TextAreaLabelText,
  RequiredAsterisk,
  StyledTextAreaInput
} from "./TextAreaInput.styled";

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
    rows = 10,
    maxLength
}) => {
    const inputId = useMemo(() => generateId(`textarea-${name}`), [name]);
    const errorId = useMemo(() => generateId(`error-${name}`), [name]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        onChange?.(e.target.value);
    };

    return (
        <TextAreaInputContainer>
            <TextAreaInputLabel htmlFor={inputId}>
                <TextAreaLabelText>
                    {label} {required && <RequiredAsterisk aria-label="required">*</RequiredAsterisk>}
                </TextAreaLabelText>
                <StyledTextAreaInput
                    id={inputId}
                    name={name}
                    value={value}
                    rows={rows}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required}
                    aria-required={required}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    maxLength={maxLength}
                    aria-label={label}
                />
            </TextAreaInputLabel>
            {error && (
                <span id={errorId} role="alert" style={{ color: 'red', fontSize: '0.875rem' }}>
                    {error}
                </span>
            )}
            {maxLength && value && (
                <span 
                    aria-live="polite" 
                    aria-atomic="true"
                    style={{ fontSize: '0.875rem', color: '#666' }}
                >
                    {value.length}/{maxLength} characters
                </span>
            )}
        </TextAreaInputContainer>
    );
};

export default TextAreaInput;