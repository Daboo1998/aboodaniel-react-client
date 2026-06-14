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
    RolesPanelTitleGroup,
    RolesPanelActions,
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
        const rolePromise = rolesToDelete.length !== 0
            ? database.roles.deleteMany(rolesToDelete).then(() => setRolesToDelete([]))
            : Promise.resolve();

        const userPromise = usersFromRoleToDelete.length !== 0
            ? Promise.all(
                usersFromRoleToDelete.map(roleAndUsers =>
                    database.roles.removeManyFromArray(roleAndUsers.role, "users", roleAndUsers.users)
                )
            ).then(() => setUsersFromRoleToDelete([]))
            : Promise.resolve();

        Promise.all([rolePromise, userPromise])
            .then(() => refresh(r => !r))
            .catch((error) => alert(error.message));
    };

    const handleRoleCheck = (isChecked: boolean, roleId: string) => {
        if (isChecked && !rolesToDelete.includes(roleId)) {
            setRolesToDelete([...rolesToDelete, roleId]);
        } else if (!isChecked) {
            setRolesToDelete(rolesToDelete.filter(e => e !== roleId));
        }
    };

    const handleUserCheck = (isChecked: boolean, roleId: string, user: string) => {
        const existingEntry = usersFromRoleToDelete.find(e => e.role === roleId);
        const existingUsers = existingEntry ? existingEntry.users : [];

        if (existingUsers.includes(user) && isChecked) return;

        const updatedUsers = isChecked
            ? [...existingUsers, user]
            : existingUsers.filter(u => u !== user);

        const newList = usersFromRoleToDelete.filter(e => e.role !== roleId);
        if (updatedUsers.length > 0) newList.push({ role: roleId, users: updatedUsers });
        setUsersFromRoleToDelete(newList);
    };

    const handleShowAddUserPopup = (roleType: string) => {
        setSelectedRoleType(roleType);
        showAddUserPopup();
    };

    const handleChange = () => {
        refresh(r => !r);
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
                    <RolesPanelTitleGroup>
                        <RolesPanelTitle>Access roles</RolesPanelTitle>
                        {selectionCount > 0 && (
                            <SelectionBadge>{selectionCount} selected</SelectionBadge>
                        )}
                    </RolesPanelTitleGroup>
                    <RolesPanelActions>
                        {selectionCount > 0 && (
                            <DeleteButton onClick={handleDelete}>
                                <TrashIcon />
                                Delete selected
                            </DeleteButton>
                        )}
                        <button className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }} onClick={showAddRolePopup}>
                            + Add role
                        </button>
                    </RolesPanelActions>
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
