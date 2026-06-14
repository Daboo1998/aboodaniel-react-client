import Role from "../../../data/Role";
import React, { useState } from "react";
import {
    RoleRow,
    RoleRowHeader,
    RoleCheckbox,
    RoleName,
    UserCountBadge,
    Flex1,
    UsersGrid,
    UserPill,
    UserCheckbox
} from "./RoleComponent.styled";

interface RoleComponentProps {
    role: Role;
    onShowAddUserPopup: (id: string) => void;
    onRoleCheck?: (isChecked: boolean, roleId: string) => void;
    onUserCheck?: (isChecked: boolean, roleId: string, userId: string) => void;
}

const RoleComponent: React.FC<RoleComponentProps> = ({ role, onShowAddUserPopup, onRoleCheck, onUserCheck }) => {
    const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
    const [isRoleChecked, setIsRoleChecked] = useState(false);

    const handleRoleCheckboxChange = (isChecked: boolean) => {
        onRoleCheck?.(isChecked, role.id);
        setCheckedUsers(isChecked ? role.users : []);
        setIsRoleChecked(isChecked);
    };

    const handleUserCheckboxChange = (isChecked: boolean, checkedUser: string) => {
        onUserCheck?.(isChecked, role.id, checkedUser);
        if (isChecked) {
            if (!checkedUsers.includes(checkedUser)) {
                setCheckedUsers([...checkedUsers, checkedUser]);
            }
        } else {
            setCheckedUsers(checkedUsers.filter(u => u !== checkedUser));
            if (isRoleChecked) setIsRoleChecked(false);
        }
    };

    if (!role?.id) return null;

    const userCount = role.users?.length ?? 0;

    return (
        <RoleRow>
            <RoleRowHeader>
                <RoleCheckbox
                    type="checkbox"
                    checked={isRoleChecked}
                    onChange={e => handleRoleCheckboxChange(e.target.checked)}
                    aria-label={`Select role ${role.id} for deletion`}
                />
                <RoleName>{role.id}</RoleName>
                {userCount > 0 && (
                    <UserCountBadge>{userCount} {userCount === 1 ? 'user' : 'users'}</UserCountBadge>
                )}
                <Flex1 />
                <button
                    className="btn btn-ghost"
                    style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem', borderRadius: '10px' }}
                    onClick={() => onShowAddUserPopup(role.id)}
                >
                    + Add user
                </button>
            </RoleRowHeader>
            {userCount > 0 && (
                <UsersGrid>
                    {role.users.map(user => (
                        <UserPill key={user} $checked={checkedUsers.includes(user)}>
                            <UserCheckbox
                                type="checkbox"
                                checked={checkedUsers.includes(user)}
                                onChange={e => handleUserCheckboxChange(e.target.checked, user)}
                                aria-label={`Select ${user} for removal`}
                            />
                            {user}
                        </UserPill>
                    ))}
                </UsersGrid>
            )}
        </RoleRow>
    );
};

export default RoleComponent;
