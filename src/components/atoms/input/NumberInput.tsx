import React from "react";
import styled from "styled-components";

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

// shared styled parts inlined for now
const Wrapper = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray900};
  font-family: sans-serif;
  font-weight: bold;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid ${({ theme }) => theme.colors.gray600};
  transition: box-shadow 0.2s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }
`;

const NumberInput: React.FC<NumberInputProps> = ({
    min,
    max,
    name ,
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
        <Wrapper>
            <StyledLabel htmlFor={name}>
                {label} {required && <span style={{ color: "#dc2626" }}>*</span>}
                <StyledInput
                    type="number"
                    value={value}
                    onChange={handleChange}
                    name={name}
                    placeholder={placeholder || ""}
                    min={min}
                    max={max}
                />
            </StyledLabel>
        </Wrapper>
    );
};

export default NumberInput;