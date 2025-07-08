import React from "react";
import {
  DateInputContainer,
  DateInputLabel,
  DateLabelText,
  RequiredAsterisk,
  StyledDateInput
} from "./DateInput.styled";

export interface DateInputProps {
    name: string;
    value?: string;
    onChange?: (value: string) => void;
    label: string;
    required?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
    name,
    label,
    value,
    onChange,
    required
}) => {
    return (
        <DateInputContainer>
            <DateInputLabel htmlFor={name}>
                <DateLabelText>
                    {label} {required && <RequiredAsterisk>*</RequiredAsterisk>}
                </DateLabelText>
                <StyledDateInput
                    value={value}
                    onChange={e => onChange?.(e.target.value)}
                    name={name}
                    type="date"
                />
            </DateInputLabel>
        </DateInputContainer>
    );
};

export default DateInput;