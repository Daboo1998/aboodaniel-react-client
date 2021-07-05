import React, {useState} from "react";
import {PopupProps} from "../../../../hooks/usePopup";
import database from "../../../../data/database";
import AddPopup from "./AddPopup";

interface AddRolePopupProps extends PopupProps {
    hide: () => void;
    onAdded?: () => void;
}

const AddRolePopup: React.FC<AddRolePopupProps> = ({isPopupShown, hide, onAdded}) => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleSubmit = (newRole: string) => {
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

    return <AddPopup fieldName={"role"} hide={hide} isPopupShown={isPopupShown} onAdd={handleSubmit} errorMessage={errorMessage} />;
};

export default AddRolePopup;