import React, {FormEventHandler, useState} from "react";
import {Popup, PopupProps} from "../../../hooks/usePopup";
import firebase from "firebase";
import Spacer from "../../atoms/Spacer";

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

        const documentReference = firebase.firestore()
            .collection("roles")
            .doc(role);

        firebase.firestore()
            .runTransaction(transaction => {
                return transaction
                    .get(documentReference)
                    .then(document => {
                        if (!document.exists) {
                            throw Error("Document does not exist!");
                        }
                        const users = document.data()?.users;
                        const newUsers = [...users, user];

                        transaction.update(documentReference, { users: newUsers });
                    });
            }).then(() => {
                console.log("Transaction successfully committed!");
                onAdded?.();
                hide();
            }).catch((error) => {
                console.log("Transaction failed: ", error);
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