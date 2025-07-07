import React from "react";
import { TextInputProps } from "./TextInput";
import {
  TextAreaInputContainer,
  TextAreaInputLabel,
  TextAreaLabelText,
  RequiredAsterisk,
  StyledTextAreaInput
} from "./TextAreaInput.styled";

export interface TextAreaInputProps extends TextInputProps {}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
    name,
    label,
    value,
    onChange,
    required
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        onChange?.(e.target.value);
    };

    return (
        <TextAreaInputContainer>
            <TextAreaInputLabel htmlFor={name}>
                <TextAreaLabelText>
                    {label} {required && <RequiredAsterisk>*</RequiredAsterisk>}
                </TextAreaLabelText>
                <StyledTextAreaInput
                    name={name}
                    value={value}
                    rows={10}
                    onChange={handleChange}
                />
            </TextAreaInputLabel>
        </TextAreaInputContainer>
    );
};

export default TextAreaInput;