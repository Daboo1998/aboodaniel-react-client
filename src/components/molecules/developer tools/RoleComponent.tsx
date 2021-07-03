import Role from "../../../data/Role";
import React from "react";
import Spacer from "../../atoms/utilities/Spacer";
import AddButton from "../../atoms/buttons and links/AddButton";

interface RoleComponentProps {
    role: Role;
    onShowAddUserPopup: (id: string) => void;
}

const RoleComponent: React.FC<RoleComponentProps> = ({role, onShowAddUserPopup}) => {
    return (<>
        {
            role && role.id && (
                <li key={role.id}>
                    <div className="flex flex-row items-center border-b border-black dark:border-white">
                        <h3>{role.id}</h3>
                        <Spacer />
                        <AddButton onClick={() => onShowAddUserPopup(role.id)} text="Add User"/>
                    </div>
                    {
                        role.users && <ol className="pl-4">
                            {
                                role.users?.map((user, idx) => {
                                    return <li key={user}>
                                        <p>
                                            {`${idx + 1}. ${user}`}
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