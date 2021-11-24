import React from "react";
import {PopupProps} from "../Popup";
import AddPopup from "./AddPopup";
import {useAddUserToRole} from "../../../../hooks/useRoles";

interface AddUserPopupProps extends PopupProps {
    hide: () => void,
    onAdded?: () => void
    role: string;
}

const AddUserPopup: React.FC<AddUserPopupProps> = ({isPopupShown, hide, role, onAdded}) => {
    const {addUserToRole, addUserToRoleError} = useAddUserToRole(onAdded);

    const handleSubmit = (user: string) => {
        addUserToRole(role, user);
    };

    return <AddPopup fieldName={"user"} hide={hide} isPopupShown={isPopupShown} onAdd={handleSubmit} errorMessage={addUserToRoleError?.message} />;
};

export default AddUserPopup;