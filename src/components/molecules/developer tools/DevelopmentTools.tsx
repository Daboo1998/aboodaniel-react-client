import React, {MouseEventHandler, useState} from "react";
import usePopup from "../../../hooks/usePopup";
import AddRolePopup from "../popups/developer tools/AddRolePopup";
import AddUserPopup from "../popups/developer tools/AddUserPopup";
import Spacer from "../../atoms/utilities/Spacer";
import RoleComponent from "./RoleComponent";
import Button, {ButtonType} from "../../atoms/buttons and links/Button";
import {ReactComponent as TrashIcon} from "../../../images/icons/trash.svg";
import useRoles, {useDeleteRoles} from "../../../hooks/useRoles";

const DevelopmentTools: React.FC = () => {
    const [isAddRolePopupShown, showAddRolePopup, hideAddRolePopup] = usePopup();
    const [isAddUserPopupShown, showAddUserPopup, hideAddUserPopup] = usePopup();
    const [selectedRoleType, setSelectedRoleType] = useState("");
    const [rolesToDelete, setRolesToDelete] = useState<string []>([]);
    const [usersFromRoleToDelete, setUsersFromRoleToDelete] = useState<{role: string, users: string[]} []>([]);
    const { roles, reloadRoles, rolesAreLoading } = useRoles();
    const {deleteRoles} = useDeleteRoles(() => setRolesToDelete([]));

    const handleDelete: MouseEventHandler = (e) => {
        e.preventDefault();
        if (rolesToDelete.length !== 0) {
            deleteRoles(rolesToDelete)
        }
    };

    const handleRoleCheck = (isChecked: boolean, roleId: string) => {
        if (isChecked && !rolesToDelete.includes(roleId)) {
            setRolesToDelete([...rolesToDelete, roleId]);
        } else if (!isChecked) {
            setRolesToDelete(rolesToDelete.filter(e => e !== roleId));
        }
    };

    const handleUserCheck = (isChecked: boolean, roleId: string, user: string) => {
        let filterRes = usersFromRoleToDelete.filter(e => e.role === roleId);

        if (filterRes.length === 0) {
            filterRes.push({role: roleId, users:[]});
        }

        let users = filterRes[0].users;
        if (users.includes(user) && isChecked) return;

        if (isChecked) {
            users.push(user);
        } else if (!isChecked) {
            users = users.filter(u => u !== user);
        }

        let newUsersFromRoleToDelete = usersFromRoleToDelete.filter(e => e.role !== roleId);
        newUsersFromRoleToDelete.push({role: roleId, users});

        setUsersFromRoleToDelete(newUsersFromRoleToDelete);
    };

    const handleShowAddUserPopup = (roleType: string) => {
        setSelectedRoleType(roleType);
        showAddUserPopup();
    };

    const handleChange = () => {
        reloadRoles();
    };

    return (
        <div>
            <h1>Development Tools</h1>
            <AddRolePopup isPopupShown={isAddRolePopupShown} hide={hideAddRolePopup} onAdded={handleChange}/>
            <AddUserPopup role={selectedRoleType} isPopupShown={isAddUserPopupShown} hide={hideAddUserPopup} onAdded={handleChange} />
            <div className="mt-4 border border-black dark:border-white w-full">
                <div className="flex flex-row border-b border-black dark:border-white items-center px-2 space-x-2">
                    <h2 className="">Roles list</h2>
                    <Spacer />
                    <Button action={showAddRolePopup} label="Add Role" type={ButtonType.constructive}/>
                    <button onClick={handleDelete} >
                        <TrashIcon className="w-5 text-red-600 >md:hover:text-red-900 fill-current" />
                    </button>
                </div>
                {
                    rolesAreLoading ? <p className="text-gray-600 text-center">Loading...</p> : (
                        <ul className="px-2">
                            {
                                roles.map((role) => {
                                    return <RoleComponent role={role} onRoleCheck={handleRoleCheck} onUserCheck={handleUserCheck} onShowAddUserPopup={handleShowAddUserPopup}/>
                                })
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    );
};

export default DevelopmentTools;