import React from "react";

export interface ShouldRememberUserCheckboxProps {
    shouldRememberUser: boolean;
    setShouldRememberUser: (value: boolean) => void;
}

const ShouldRememberUserCheckbox: React.FC<ShouldRememberUserCheckboxProps> = (props) => (
    <div className="flex flex-row items-center">
        <input
            type="checkbox"
            checked={props.shouldRememberUser}
            onChange={e => props.setShouldRememberUser(e.target.checked)}
        />
        <p className="pl-2">Remember me</p>
    </div>
);

export default ShouldRememberUserCheckbox;