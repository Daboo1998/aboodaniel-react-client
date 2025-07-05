import React, {MouseEventHandler, useEffect, useState} from "react";
import usePopup from "../../../hooks/usePopup";
import AddRolePopup from "../popups/developer tools/AddRolePopup";
import AddUserPopup from "../popups/developer tools/AddUserPopup";
import Spacer from "../../atoms/utilities/Spacer";
import database from "../../../data/database";
import Role from "../../../data/Role";
import RoleComponent from "./RoleComponent";
import Button, {ButtonType} from "../../atoms/buttons and links/Button";
import {ReactComponent as TrashIcon} from "../../../images/icons/trash.svg";
import {
    DevelopmentToolsContainer,
    DevelopmentToolsTitle,
    RolesListContainer,
    RolesListHeader,
    RolesListTitle,
    DeleteButton,
    RolesList
} from "./DevelopmentTools.styled";

const DevelopmentTools: React.FC = () => {
    const [rolesList, setRolesList] = useState<Role []>([]);
    const [isAddRolePopupShown, showAddRolePopup, hideAddRolePopup] = usePopup();
    const [isAddUserPopupShown, showAddUserPopup, hideAddUserPopup] = usePopup();
    const [selectedRoleType, setSelectedRoleType] = useState("");
    const [refreshIndicator, refresh] = useState<boolean>();
    const [rolesToDelete, setRolesToDelete] = useState<string []>([]);
    const [usersFromRoleToDelete, setUsersFromRoleToDelete] = useState<{role: string, users: string[]} []>([]);

    const handleDelete: MouseEventHandler = (e) => {
        e.preventDefault();
        if (rolesToDelete.length !== 0) {
            database.roles.deleteMany(rolesToDelete).then(() => {
                refresh(!refreshIndicator);
                setRolesToDelete([]);
            }).catch((error) => {
                alert(error.message);
            });
        }

        if (usersFromRoleToDelete.length !== 0) {
            let rolesProcessed = 0;
            usersFromRoleToDelete.forEach(roleAndUsers => {
                database.roles
                    .removeManyFromArray(roleAndUsers.role, "users", roleAndUsers.users)
                    .then(() => {
                        rolesProcessed += 1;
                        if (rolesProcessed === usersFromRoleToDelete.length) {
                            setUsersFromRoleToDelete([]);
                            refresh(!refreshIndicator);
                        }
                    }).catch((error) => {
                        alert(error.message);
                    });
            })
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
        refresh(!refreshIndicator);
    };

    useEffect(() => {
        console.log("Refreshing list...");
        setRolesList([]);

        database.roles.getAll().then(results => {
            setRolesList(results);
        }).catch(e => {
            console.log("Could not get list of roles: " + e.message);
        });
    }, [refreshIndicator]);

    return (
        <DevelopmentToolsContainer>
            <DevelopmentToolsTitle>Development Tools</DevelopmentToolsTitle>
            <AddRolePopup isPopupShown={isAddRolePopupShown} hide={hideAddRolePopup} onAdded={handleChange}/>
            <AddUserPopup role={selectedRoleType} isPopupShown={isAddUserPopupShown} hide={hideAddUserPopup} onAdded={handleChange} />
            <RolesListContainer>
                <RolesListHeader>
                    <RolesListTitle>Roles list</RolesListTitle>
                    <Spacer />
                    <Button action={showAddRolePopup} label="Add Role" type={ButtonType.constructive}/>
                    <DeleteButton onClick={handleDelete}>
                        <TrashIcon />
                    </DeleteButton>
                </RolesListHeader>
                <RolesList>
                    {
                        rolesList?.map((role) => {
                            return <RoleComponent key={role.id} role={role} onRoleCheck={handleRoleCheck} onUserCheck={handleUserCheck} onShowAddUserPopup={handleShowAddUserPopup}/>
                        })
                    }
                </RolesList>
            </RolesListContainer>
        </DevelopmentToolsContainer>
    );
};

export default DevelopmentTools;