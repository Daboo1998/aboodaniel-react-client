import React, {useEffect, useState} from "react";
import firebase from "firebase/app";
import usePopup from "../../../hooks/usePopup";
import AddRolePopup from "./AddRolePopup";
import AddUserPopup from "./AddUserPopup";
import Spacer from "../../atoms/Spacer";
import "firebase/firestore";

type Role = {
    type: string;
    users: [string]
};

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
        const col = firebase.firestore()
            .collection("roles");

        setRolesList([]);
        col.get()
            .then(result => {
                const newList = result.docs.map((doc) => {
                    const docData = doc.data();

                    return {
                        type: doc.id,
                        users: docData.users ? docData.users : [],
                    }
                });

                console.log(`Got ${newList.length} roles!`);

                setRolesList(newList);
            }).catch(e => {
                console.log("Could not get list of roles: " + e.message);
            });
    }, [refreshIndicator]);

    return (
        <div>
            <h1>Development Tools</h1>
            <AddRolePopup isPopupShown={isAddRolePopupShown} hide={hideAddRolePopup} onAdded={handleChange}/>
            <AddUserPopup role={selectedRoleType} isPopupShown={isAddUserPopupShown} hide={hideAddUserPopup} onAdded={handleChange} />
            <div className="mt-4 border border-black w-max">
                <div className="flex flex-row border-b border-black items-center px-2">
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
                            return role && role.type && (
                                <li key={role.type}>
                                    <div className="flex flex-row items-center border-b border-black">
                                        <h3>{role.type}</h3>
                                        <Spacer />
                                        <button
                                            className="border border-black p-1 m-1 rounded bg-green-600"
                                            onClick={_ => handleShowAddUserPopup(role.type)}
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