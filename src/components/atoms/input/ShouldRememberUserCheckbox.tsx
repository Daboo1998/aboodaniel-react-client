import React from "react";
import {
  CheckboxContainer,
  StyledCheckbox,
  CheckboxLabel
} from "./ShouldRememberUserCheckbox.styled";

export interface ShouldRememberUserCheckboxProps {
    shouldRememberUser: boolean;
    setShouldRememberUser: (value: boolean) => void;
}

const ShouldRememberUserCheckbox: React.FC<ShouldRememberUserCheckboxProps> = (props) => (
    <CheckboxContainer>
        <StyledCheckbox
            type="checkbox"
            checked={props.shouldRememberUser}
            onChange={e => props.setShouldRememberUser(e.target.checked)}
        />
        <CheckboxLabel>Remember me</CheckboxLabel>
    </CheckboxContainer>
);

export default ShouldRememberUserCheckbox;