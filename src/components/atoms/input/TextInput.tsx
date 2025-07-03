import React from "react";
import styled from "styled-components";

// --- Styled components ----------------------------------------------------

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
    name ,
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
        <Wrapper>
            <StyledLabel htmlFor={name}>
                {label} {required && <span style={{ color: "#dc2626" }}>*</span>}
                <StyledInput
                    type={isPassword ? "password" : "text"}
                    value={value}
                    aria-invalid
                    onChange={handleChange}
                    name={name}
                    placeholder={placeholder || ""}
                />
            </StyledLabel>
        </Wrapper>
    );
};

export default TextInput;