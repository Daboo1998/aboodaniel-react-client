import React from "react";
import {
  NumberInputContainer,
  NumberInputLabel,
  NumberLabelText,
  RequiredAsterisk,
  StyledNumberInput
} from "./NumberInput.styled";

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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        onChange?.(e.target.valueAsNumber);
    };

    return (
        <NumberInputContainer>
            <NumberInputLabel htmlFor={name}>
                <NumberLabelText>
                    {label} {required && <RequiredAsterisk>*</RequiredAsterisk>}
                </NumberLabelText>
                <StyledNumberInput
                    type="number"
                    value={value}
                    onChange={handleChange}
                    name={name}
                    placeholder={placeholder ? placeholder : ""}
                    min={min}
                    max={max}
                />
            </NumberInputLabel>
        </NumberInputContainer>
    );
};

export default NumberInput;