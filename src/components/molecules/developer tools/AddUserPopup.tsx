import React, {FormEventHandler, useState} from "react";
import {Popup, PopupProps} from "../../../hooks/usePopup";
import firebase from "firebase";
import Spacer from "../../atoms/Spacer";

interface AddUserPopupProps extends PopupProps {
    hide: () => void,
    role: string;
}

const AddUserPopup: React.FC<AddUserPopupProps> = ({isPopupShown, hide, role}) => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [user, setUser] = useState("");

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        firebase.firestore().collection("roles")
            .doc(role)
            .update("users", user)
            .catch(e => {
                setErrorMessage(e.message);
            }).then(() => {
            hide();
        });
    };

    return (
        <Popup isPopupShown={isPopupShown}>
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
        </Popup>
    );
};

export default AddUserPopup;