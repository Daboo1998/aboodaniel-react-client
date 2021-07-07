import React, {useEffect, useState} from "react";
import firebase from "firebase/app";
import AuthContext from "../../contexts/AuthContext";

import "firebase/auth";
import database from "../../data/database";

const provider = new firebase.auth.GoogleAuthProvider();

const checkForRole = async (role: string) => {
    try {
        await database.roles.get(role);

        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
};

export const AuthContextProvider: React.FC = ({children}) => {
    const [loginSource, setLoginSource] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean| undefined>(undefined);
    const [user, setUser] = useState<firebase.User | null>(null);
    const [isDeveloper, setIsDeveloper] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    const checkRoles = async () => {
        const isDeveloper = await checkForRole("developer");
        console.log(isDeveloper ? "Is developer" : "Is not a developer");

        if (isDeveloper) {
            setIsDeveloper(isDeveloper);
        }

        const isOwner = await checkForRole("owner");
        console.log(isOwner ? "Is owner" : "Is not an owner");

        setIsOwner(isOwner);
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(function(newUser) {
            if (newUser && !newUser.isAnonymous) {
                checkRoles().then();
                setIsLoggedIn(true);
                setUser(newUser);
            } else {
                setIsLoggedIn(false);
                setIsOwner(false);
                setIsDeveloper(false);
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async (email: string, password: string, shouldRememberUser: boolean) => {
        let persistence = firebase.auth.Auth.Persistence.SESSION;

        if (shouldRememberUser) {
            persistence = firebase.auth.Auth.Persistence.LOCAL;
        }

        return firebase.auth().setPersistence(persistence).then(() => {
            return firebase.auth().signInWithEmailAndPassword(email, password);
        });
    };

    const handleLoginWithGoogle = async (shouldRememberUser: boolean) => {
        let persistence = firebase.auth.Auth.Persistence.SESSION;

        if (shouldRememberUser) {
            persistence = firebase.auth.Auth.Persistence.LOCAL;
        }

        return firebase.auth().setPersistence(persistence).then(() => {
            return firebase.auth().signInWithPopup(provider);
        });
    };

    const handleRegister = async (email: string, password: string, shouldRememberUser: boolean) => {
        let persistence = firebase.auth.Auth.Persistence.SESSION;

        if (shouldRememberUser) {
            persistence = firebase.auth.Auth.Persistence.LOCAL;
        }

        return firebase.auth().setPersistence(persistence).then(() => {
            return firebase.auth().createUserWithEmailAndPassword(email, password);
        });
    };

    const handleLogout = () => {
        return firebase.auth().signOut();
    };

    const wentToLogin = (source: string) => {
        setLoginSource(source);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
            login: handleLogin,
            loginWithGoogle: handleLoginWithGoogle,
            logout: handleLogout, wentToLogin,
            register: handleRegister,
            loginSource,
            isDeveloper,
            isOwner}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;