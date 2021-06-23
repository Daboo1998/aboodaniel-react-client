import React, {useEffect, useState} from "react";
import firebase from "firebase";
import usePopup from "../../../hooks/usePopup";
import AddRolePopup from "./AddRolePopup";
import AddUserPopup from "./AddUserPopup";
import Spacer from "../../atoms/Spacer";

type Role = {
    type: string;
    users: [string]
};

const DevelopmentTools: React.FC = () => {
    const [rolesList, setRolesList] = useState<Role []>([]);
    const [isAddRolePopupShown, showAddRolePopup, hideAddRolePopup] = usePopup();
    const [isAddUserPopupShown, showAddUserPopup, hideAddUserPopup] = usePopup();

    useEffect(() => {
        console.log("Refreshed list")
        const col = firebase.firestore()
            .collection("roles");

        const unsubscribe = col
            .onSnapshot((querySnapshot => {
                let newRolesList: Role[] = [];
                querySnapshot
                    .forEach(snapshot => {
                        console.log("Doc changed: " + snapshot);
                        const docData = snapshot.data();
                        const roleData = {
                            type: docData.id,
                            users: docData.users ? docData.users : [],
                        };

                        newRolesList.push(roleData);
                        setRolesList?.(newRolesList);
                    });
            }), error => {
                console.log(error.message);
            });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h1>Development Tools</h1>
            <AddRolePopup isPopupShown={isAddRolePopupShown} hide={hideAddRolePopup} />
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
                                    <AddUserPopup role={role.type} isPopupShown={isAddUserPopupShown} hide={hideAddUserPopup} />
                                    <div className="flex flex-row items-center border-b border-black">
                                        <h3>{role.type}</h3>
                                        <Spacer />
                                        <button
                                            className="border border-black p-1 m-1 rounded bg-green-600"
                                            onClick={_ => showAddUserPopup()}
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