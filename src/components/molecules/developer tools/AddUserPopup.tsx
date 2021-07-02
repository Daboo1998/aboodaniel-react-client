import React, {FormEventHandler, useState} from "react";
import {Popup, PopupProps} from "../../../hooks/usePopup";
import Spacer from "../../atoms/Spacer";
import database from "../../../data/database";

interface AddUserPopupProps extends PopupProps {
    hide: () => void,
    onAdded?: () => void
    role: string;
}

const AddUserPopup: React.FC<AddUserPopupProps> = ({isPopupShown, hide, role, onAdded}) => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [user, setUser] = useState("");

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        database.roles
            .pushToArray<string>(role, "users", user)
            .then(() => {
                console.log("Transaction successfully committed!");
                onAdded?.();
                hide();
            }).catch((error) => {
                console.log("Transaction failed: ", error);
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
                        <h3>Add user</h3>
                        <input type="text" onChange={e => setUser(e.target.value)} className="border border-black rounded px-2"/>
                    </label>
                    {!!errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
                    <button type="submit">Add</button>
                </form>
            </div>
            <Spacer />
        </Popup>
    );
};

export default AddUserPopup;