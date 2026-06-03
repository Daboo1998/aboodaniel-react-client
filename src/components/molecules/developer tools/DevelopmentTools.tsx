import React, {MouseEventHandler, useEffect, useState} from "react";
import usePopup from "../../../hooks/usePopup";
import AddRolePopup from "../popups/developer tools/AddRolePopup";
import AddUserPopup from "../popups/developer tools/AddUserPopup";
import database from "../../../data/database";
import Role from "../../../data/Role";
import RoleComponent from "./RoleComponent";
import {ReactComponent as TrashIcon} from "../../../images/icons/trash.svg";
import useScrollReveal from "../../../hooks/useScrollReveal";
import {
    DevelopmentToolsContainer,
    DevelopmentToolsTitle,
    RolesPanel,
    RolesPanelHeader,
    RolesPanelTitle,
    SelectionBadge,
    DeleteButton,
    RolesList,
    EmptyState
} from "./DevelopmentTools.styled";

const DevelopmentTools: React.FC = () => {
    const [rolesList, setRolesList] = useState<Role[]>([]);
    const [isAddRolePopupShown, showAddRolePopup, hideAddRolePopup] = usePopup();
    const [isAddUserPopupShown, showAddUserPopup, hideAddUserPopup] = usePopup();
    const [selectedRoleType, setSelectedRoleType] = useState("");
    const [refreshIndicator, refresh] = useState<boolean>();
    const [rolesToDelete, setRolesToDelete] = useState<string[]>([]);
    const [usersFromRoleToDelete, setUsersFromRoleToDelete] = useState<{role: string, users: string[]}[]>([]);

    const selectionCount = rolesToDelete.length + usersFromRoleToDelete.reduce((sum, r) => sum + r.users.length, 0);

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
            });
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
        if (filterRes.length === 0) filterRes.push({role: roleId, users: []});

        let users = filterRes[0].users;
        if (users.includes(user) && isChecked) return;

        if (isChecked) {
            users.push(user);
        } else {
            users = users.filter(u => u !== user);
        }

        const newList = usersFromRoleToDelete.filter(e => e.role !== roleId);
        newList.push({role: roleId, users});
        setUsersFromRoleToDelete(newList);
    };

    const handleShowAddUserPopup = (roleType: string) => {
        setSelectedRoleType(roleType);
        showAddUserPopup();
    };

    const handleChange = () => {
        refresh(!refreshIndicator);
    };

    useScrollReveal([rolesList]);

    useEffect(() => {
        setRolesList([]);
        database.roles.getAll().then(results => {
            setRolesList(results);
        }).catch(e => {
            console.log("Could not get list of roles: " + e.message);
        });
    }, [refreshIndicator]);

    return (
        <DevelopmentToolsContainer>
            <span className="kicker reveal in"><span className="idx">✦</span> — Admin Panel</span>
            <DevelopmentToolsTitle className="reveal in" data-delay="1">Development Tools</DevelopmentToolsTitle>

            <AddRolePopup isPopupShown={isAddRolePopupShown} hide={hideAddRolePopup} onAdded={handleChange} />
            <AddUserPopup role={selectedRoleType} isPopupShown={isAddUserPopupShown} hide={hideAddUserPopup} onAdded={handleChange} />

            <RolesPanel className="reveal" data-delay="2">
                <RolesPanelHeader>
                    <RolesPanelTitle>Access roles</RolesPanelTitle>
                    {selectionCount > 0 && (
                        <SelectionBadge>{selectionCount} selected</SelectionBadge>
                    )}
                    <span style={{ flex: 1 }} />
                    {selectionCount > 0 && (
                        <DeleteButton onClick={handleDelete}>
                            <TrashIcon />
                            Delete selected
                        </DeleteButton>
                    )}
                    <button className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }} onClick={showAddRolePopup}>
                        + Add role
                    </button>
                </RolesPanelHeader>
                <RolesList>
                    {rolesList.length === 0 ? (
                        <EmptyState>No roles configured yet.</EmptyState>
                    ) : (
                        rolesList.map(role => (
                            <RoleComponent
                                key={role.id}
                                role={role}
                                onRoleCheck={handleRoleCheck}
                                onUserCheck={handleUserCheck}
                                onShowAddUserPopup={handleShowAddUserPopup}
                            />
                        ))
                    )}
                </RolesList>
            </RolesPanel>
        </DevelopmentToolsContainer>
    );
};

export default DevelopmentTools;
