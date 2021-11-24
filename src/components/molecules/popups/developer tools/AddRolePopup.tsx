import React from "react";
import {PopupProps} from "../Popup";
import {useAddRole} from "../../../../hooks/useRoles";
import AddPopup from "./AddPopup";

interface AddRolePopupProps extends PopupProps {
    hide: () => void;
    onAdded?: () => void;
}

const AddRolePopup: React.FC<AddRolePopupProps> = ({isPopupShown, hide, onAdded}) => {
    const {addRole, addRoleError} = useAddRole(onAdded);

    const handleSubmit = (newRole: string) => {
        addRole({
            id: newRole,
            users: []
        });
    };

    return <AddPopup fieldName={"role"} hide={hide} isPopupShown={isPopupShown} onAdd={handleSubmit} errorMessage={addRoleError?.message} />;
};

export default AddRolePopup;