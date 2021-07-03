import React, {FormEventHandler, useState} from "react";
import {Popup, PopupProps} from "../../../hooks/usePopup";
import Spacer from "../../atoms/Spacer";
import database from "../../../data/database";
import {ReactComponent as CloseIcon} from "../../../images/icons/closeIcon.svg";

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
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
                <div className="flex flex-row pb-4 items-center">
                    <h3>Add role</h3>
                    <Spacer />
                    <button className="self-end" onClick={hide}><CloseIcon /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-row items-center">
                    <label>
                        <input type="text" onChange={e => setNewRole(e.target.value)} className="border border-black dark:border-white rounded px-2"/>
                    </label>
                    {!!errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
                    <button type="submit" className="pl-2">Add</button>
                </form>
            </div>
            <Spacer />
        </Popup>
    );
};

export default AddRolePopup;