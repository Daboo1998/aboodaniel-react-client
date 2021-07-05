import React, {useEffect, useState} from "react";
import usePopup from "../../../hooks/usePopup";
import AddRolePopup from "../popups/developer tools/AddRolePopup";
import AddUserPopup from "../popups/developer tools/AddUserPopup";
import Spacer from "../../atoms/utilities/Spacer";
import database from "../../../data/database";
import Role from "../../../data/Role";
import RoleComponent from "./RoleComponent";
import AddButton from "../../atoms/buttons and links/AddButton";

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
            <div className="mt-4 border border-black dark:border-white w-full">
                <div className="flex flex-row border-b border-black dark:border-white items-center px-2">
                    <h2 className="">Roles list</h2>
                    <Spacer />
                    <AddButton onClick={showAddRolePopup} text="Add Role"/>
                </div>
                <ul className="px-2">
                    {
                        rolesList?.map((role) => {
                            return <RoleComponent role={role} onShowAddUserPopup={handleShowAddUserPopup}/>
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default DevelopmentTools;