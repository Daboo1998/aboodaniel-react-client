import React, {FormEventHandler, useState} from "react";
import {Popup, PopupProps} from "../../../hooks/usePopup";
import Spacer from "../../atoms/Spacer";
import database from "../../../data/database";
import {ReactComponent as CloseIcon} from "../../../images/icons/closeIcon.svg";

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
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
                <div className="flex flex-row items-center pb-4">
                    <h3>Add user</h3>
                    <Spacer />
                    <button className="self-end" onClick={hide}><CloseIcon /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-row items-center">
                    <label>
                        <input type="text" onChange={e => setUser(e.target.value)} className="border border-black rounded px-2"/>
                    </label>
                    {!!errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
                    <button type="submit" className="pl-2">Add</button>
                </form>
            </div>
            <Spacer />
        </Popup>
    );
};

export default AddUserPopup;