import React from "react";
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
}

const TextInput: React.FC<TextInputProps> = ({
    name,
    label,
    value,
    onChange,
    isPassword,
    placeholder,
    required
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        onChange?.(e.target.value);
    };

    return (
        <InputContainer>
            <InputLabel htmlFor={name}>
                <LabelText>
                    {label} {required && <RequiredAsterisk>*</RequiredAsterisk>}
                </LabelText>
                <StyledInput
                    type={isPassword ? "password" : "text"}
                    value={value}
                    onChange={handleChange}
                    name={name}
                    placeholder={placeholder || ""}
                />
            </InputLabel>
        </InputContainer>
    );
};

export default TextInput;