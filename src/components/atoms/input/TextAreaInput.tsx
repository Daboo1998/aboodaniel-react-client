import React from "react";
import styled from "styled-components";
import {TextInputProps} from "./TextInput";

export interface TextAreaInputProps extends TextInputProps {}

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

const StyledTextArea = styled.textarea`
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

const TextAreaInput: React.FC<TextAreaInputProps> = ({
    name ,
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
        <Wrapper>
            <StyledLabel htmlFor={name}>
                {label} {required && <span style={{ color: "#dc2626" }}>*</span>}
                <StyledTextArea
                    name={name}
                    value={value}
                    rows={10}
                    onChange={handleChange}
                />
            </StyledLabel>
        </Wrapper>
    );
};

export default TextAreaInput;