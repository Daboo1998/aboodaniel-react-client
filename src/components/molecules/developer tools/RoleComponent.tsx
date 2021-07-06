import Role from "../../../data/Role";
import React, {useState} from "react";
import Spacer from "../../atoms/utilities/Spacer";
import Button, {ButtonType} from "../../atoms/buttons and links/Button"

interface RoleComponentProps {
    role: Role;
    onShowAddUserPopup: (id: string) => void;
    onRoleCheck?: (isChecked: boolean, roleId: string) => void;
    onUserCheck?: (isChecked: boolean, roleId: string, userId: string) => void;
}

const RoleComponent: React.FC<RoleComponentProps> = ({role, onShowAddUserPopup, onRoleCheck, onUserCheck}) => {
    const [checkedUsers, setCheckedUsers] = useState<string []>([]);
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

    return (<>
        {
            role && role.id && (
                <li key={role.id}>
                    <div className="flex flex-row items-center border-b border-t-4 border-black dark:border-white">
                        <input type="checkbox" onChange={e => handleRoleCheckboxChange(e.target.checked)} checked={isRoleChecked}/>
                        <h3 className="pl-2">{role.id}</h3>
                        <Spacer />
                        <Button action={() => onShowAddUserPopup(role.id)} label="Add User" type={ButtonType.constructive}/>
                    </div>
                    {
                        role.users && <ol className="pl-4">
                            {
                                role.users?.map((user) => {
                                    return <li key={user} className="flex flex-row items-center">
                                        <input type="checkbox" onChange={e => handleUserCheckboxChange(e.target.checked, user)} checked={checkedUsers.includes(user)}/>
                                        <p className="pl-2">
                                            {`${user}`}
                                        </p>
                                    </li>
                                })
                            }
                        </ol>
                    }
                </li>
            )
        }
    </>)
};

export default RoleComponent;