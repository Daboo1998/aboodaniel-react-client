import {useState, useEffect} from "react";
import Role from "../data/Role";
import database from "../data/database";

const useRoles = () => {
    const [roles, setRoles] = useState<Role []>([]);
    const [rolesAreLoading, setRolesAreLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const reloadRoles = () => {
        setRolesAreLoading(true);
        database.roles
            .getAll()
            .then(setRoles)
            .catch(setError)
            .finally(() => setRolesAreLoading(false))
    };

    const deleteRoles = async (roleIdsToDelete: string []) => {
        database.roles.deleteMany(roleIdsToDelete)
            .then(() => {
                return true;
            })
            .catch((error) => {
                setError(error);
                return false;
            });
    };

    const addRole = async (newRole: Role) => {
        database.roles.post(newRole).catch(e => {
            setError(e);
        }).then(() => {
            return true;
        }).catch(() => {
            setError(error);
            return false;
        });
    };

    useEffect(reloadRoles, []);

    return { roles, reloadRoles, rolesAreLoading, error };
};

export const useAddRole = (onSuccessfulAdd?: () => void) => {
    const [addRoleError, setAddRoleError] = useState<Error | null>(null);
    const [addingRole, setAddingRole] = useState(false);

    const addRole = (newRole: Role) => {
        setAddRoleError(null);
        setAddingRole(true);
        database.roles.post(newRole)
            .then(onSuccessfulAdd)
            .catch((e) => {
                setAddRoleError(e);
            })
            .finally(() => {
                setAddingRole(false);
            });
    };

    return {addRole, addingRole, addRoleError};
};

export const useDeleteRoles = (onSuccessfulDelete?: () => void) => {
    const [deleteRolesError, setDeleteRolesError] = useState<Error | null>(null);
    const [deletingRoles, setDeletingRoles] = useState(false);

    const deleteRoles = (roleIdsToDelete: string []) => {
        setDeletingRoles(true);
        database.roles.deleteMany(roleIdsToDelete)
            .then(onSuccessfulDelete)
            .catch(setDeleteRolesError)
            .finally(() => {
                setDeletingRoles(false);
            });
    };

    return {deleteRoles, deletingRoles, deleteRolesError}
};

export const useAddUserToRole = (onSuccessfulAdd?: () => void) => {
    const [addUserToRoleError, setAddUserToRoleError] = useState<Error | null>(null);
    const [addingUserToRole, setAddingUserToRole] = useState(false);

    const addUserToRole = (roleName: string, user: string) => {
        setAddingUserToRole(true);
        database.roles
            .pushToArray<string>(roleName, "users", user)
            .then(onSuccessfulAdd)
            .catch(setAddUserToRoleError)
            .finally(() => {
                setAddingUserToRole(false);
            })
    };

    return {addUserToRole, addingUserToRole, addUserToRoleError};
};


export default useRoles;