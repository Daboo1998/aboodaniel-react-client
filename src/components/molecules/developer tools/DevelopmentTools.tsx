import React, {useEffect, useState} from "react";
import usePopup from "../../../hooks/usePopup";
import AddRolePopup from "./AddRolePopup";
import AddUserPopup from "./AddUserPopup";
import Spacer from "../../atoms/Spacer";
import database from "../../../data/database";
import Role from "../../../data/Role";

const DevelopmentTools: React.FC = () => {
    const [rolesList, setRolesList] = useState<Role []>([]);
    const [isAddRolePopupShown, showAddRolePopup, hideAddRolePopup] = usePopup();
    const [isAddUserPopupShown, showAddUserPopup, hideAddUserPopup] = usePopup();
    const [selectedRoleType, setSelectedRoleType] = useState("");
    const [refreshIndicator, refresh] = useState<boolean>();

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
        <div>
            <h1>Development Tools</h1>
            <AddRolePopup isPopupShown={isAddRolePopupShown} hide={hideAddRolePopup} onAdded={handleChange}/>
            <AddUserPopup role={selectedRoleType} isPopupShown={isAddUserPopupShown} hide={hideAddUserPopup} onAdded={handleChange} />
            <div className="mt-4 border border-black dark:border-white w-max">
                <div className="flex flex-row border-b border-black dark:border-white items-center px-2">
                    <h2 className="">Roles list</h2>
                    <Spacer />
                    <button
                        className="border border-black p-1 m-1 rounded bg-green-600"
                        onClick={_ => showAddRolePopup()
                        }>
                        <p className="text-white">Add Role</p>
                    </button>
                </div>
                <ul className="px-2">
                    {
                        rolesList?.map((role) => {
                            return role && role.id && (
                                <li key={role.id}>
                                    <div className="flex flex-row items-center border-b border-black dark:border-white">
                                        <h3>{role.id}</h3>
                                        <Spacer />
                                        <button
                                            className="border border-black p-1 m-1 rounded bg-green-600"
                                            onClick={_ => handleShowAddUserPopup(role.id)}
                                        >
                                            <p className="text-white">add user</p>
                                        </button>
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
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default DevelopmentTools;