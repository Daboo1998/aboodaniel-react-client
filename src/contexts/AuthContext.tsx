import React, {useContext} from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

interface AuthContextInterface {
    loginSource: string;
    isLoggedIn: boolean | undefined;
    isDeveloper: boolean;
    isOwner: boolean;
    user: firebase.User | null;
    wentToLogin: (source: string) => void;
    login: (email: string, password: string, shouldRememberUser: boolean) => Promise<void | firebase.auth.UserCredential>,
    loginWithGoogle: (shouldRememberUser: boolean) => Promise<void | firebase.auth.UserCredential>;
    register: (email: string, password: string, shouldRememberUser: boolean) => Promise<void | firebase.auth.UserCredential>,
    logout: () => Promise<any>
}

const AuthContext = React.createContext<AuthContextInterface>({
    loginSource: "",
    isLoggedIn: undefined,
    isDeveloper: false,
    isOwner: false,
    wentToLogin: () => {},
    user: null,
    login: () => { return Promise.reject() },
    loginWithGoogle: () => { return Promise.reject() },
    register: () => { return Promise.reject() },
    logout: () => { return Promise.reject() }
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;

