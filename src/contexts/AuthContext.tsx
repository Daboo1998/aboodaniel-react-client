import React, {useContext, useState} from "react";
import firebase from "firebase";

interface AuthContextInterface {
    loginSource: string;
    isLoggedIn: boolean | undefined;
    wentToLogin: (source: string) => void;
    login: (email: string, password: string) => Promise<void | firebase.auth.UserCredential>,
    logout: () => Promise<any>
}


const AuthContext = React.createContext<AuthContextInterface>({
    loginSource: "",
    isLoggedIn: undefined,
    wentToLogin: (source: string) => {},
    login: (email: string, password: string) => { return Promise.reject() },
    logout: () => { return Promise.reject() }
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider: React.FC = ({children}) => {
    const [loginSource, setLoginSource] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    });

    const handleLogin = async (email: string, password: string) => {
        return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
            return firebase.auth().signInWithEmailAndPassword(email, password);
        });
    };

    const handleLogout = () => {
        return firebase.auth().signOut();
    };

    const wentToLogin = (source: string) => {
        setLoginSource(source);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login: handleLogin, logout: handleLogout, wentToLogin, loginSource}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

