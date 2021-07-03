import React, {useContext, useState, useEffect} from "react";
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

var provider = new firebase.auth.GoogleAuthProvider();

const AuthContext = React.createContext<AuthContextInterface>({
    loginSource: "",
    isLoggedIn: undefined,
    isDeveloper: false,
    isOwner: false,
    wentToLogin: (source: string) => {},
    user: null,
    login: (email: string, password: string, shouldRememberUser: boolean) => { return Promise.reject() },
    loginWithGoogle: (shouldRememberUser: boolean) => { return Promise.reject() },
    register: (email: string, password: string, shouldRememberUser: boolean) => { return Promise.reject() },
    logout: () => { return Promise.reject() }
});

export const useAuth = () => {
    return useContext(AuthContext);
};

const checkForRole = async (role: string) => {
    try {
        await firebase.firestore()
            .collection("roles")
            .doc(role)
            .get();

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

export default AuthContext;

