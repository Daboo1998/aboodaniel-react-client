import React, {useState} from "react";
import {PopupProps} from "../../../../hooks/usePopup";
import database from "../../../../data/database";
import AddPopup from "./AddPopup";

interface AddUserPopupProps extends PopupProps {
    hide: () => void,
    onAdded?: () => void
    role: string;
}

const AddUserPopup: React.FC<AddUserPopupProps> = ({isPopupShown, hide, role, onAdded}) => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleSubmit = (user: string) => {
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

    return <AddPopup fieldName={"user"} hide={hide} isPopupShown={isPopupShown} onAdd={handleSubmit} errorMessage={errorMessage} />;
};

export default AddUserPopup;