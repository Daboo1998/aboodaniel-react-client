import Role from "../../../data/Role";
import React, { useState } from "react";
import Spacer from "../../atoms/utilities/Spacer";
import Button, { ButtonType } from "../../atoms/buttons and links/Button";
import {
    RoleItem,
    RoleHeader,
    RoleCheckbox,
    RoleTitle,
    UsersList,
    UserItem,
    UserCheckbox,
    UserText
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
        isChecked ? setCheckedUsers(role.users) : setCheckedUsers([]);
        setIsRoleChecked(isChecked);
    };

    const handleUserCheckboxChange = (isChecked: boolean, checkedUser: string) => {
        onUserCheck?.(isChecked, role.id, checkedUser);
        let newUsers = [];
        if (isChecked) {
            if (!checkedUsers.includes(checkedUser)) {
                newUsers = [...checkedUsers, checkedUser];
                setCheckedUsers(newUsers);
            }
        } else {
            newUsers = checkedUsers.filter(user => user !== checkedUser);
            setCheckedUsers(newUsers);
            if (isRoleChecked) {
                setIsRoleChecked(false);
            }
        }
    };

    return (
        <>
            {
                role && role.id && (
                    <RoleItem>
                        <RoleHeader>
                            <RoleCheckbox
                                type="checkbox"
                                onChange={e => handleRoleCheckboxChange(e.target.checked)}
                                checked={isRoleChecked}
                            />
                            <RoleTitle>{role.id}</RoleTitle>
                            <Spacer />
                            <Button action={() => onShowAddUserPopup(role.id)} label="Add User" type={ButtonType.constructive}/>
                        </RoleHeader>
                        {
                            role.users && (
                                <UsersList>
                                    {
                                        role.users?.map((user) => {
                                            return (
                                                <UserItem key={user}>
                                                    <UserCheckbox
                                                        type="checkbox"
                                                        onChange={e => handleUserCheckboxChange(e.target.checked, user)}
                                                        checked={checkedUsers.includes(user)}
                                                    />
                                                    <UserText>{user}</UserText>
                                                </UserItem>
                                            )
                                        })
                                    }
                                </UsersList>
                            )
                        }
                    </RoleItem>
                )
            }
        </>
    );
};

export default RoleComponent;