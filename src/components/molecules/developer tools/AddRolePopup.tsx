import React, {FormEventHandler, useState} from "react";
import {Popup, PopupProps} from "../../../hooks/usePopup";
import Spacer from "../../atoms/Spacer";
import database from "../../../data/database";

interface AddRolePopupProps extends PopupProps {
    hide: () => void;
    onAdded?: () => void;
}

const AddRolePopup: React.FC<AddRolePopupProps> = ({isPopupShown, hide, onAdded}) => {
    const [newRole, setNewRole] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        database.roles.post({
            id: newRole,
            users: []
        }).catch(e => {
            setErrorMessage(e.message);
        }).then(() => {
            onAdded?.();
            hide();
        });
    };

    return (
        <Popup isPopupShown={isPopupShown}>
            <Spacer />
            <div className="bg-white">
                <div className="flex flex-row">
                    <Spacer />
                    <button className="self-end" onClick={hide}>Close</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        <h3>Add role</h3>
                        <input type="text" onChange={e => setNewRole(e.target.value)} className="border border-black rounded px-2"/>
                    </label>
                    {!!errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
                    <button type="submit">Add</button>
                </form>
            </div>
            <Spacer />
        </Popup>
    );
};

export default AddRolePopup;