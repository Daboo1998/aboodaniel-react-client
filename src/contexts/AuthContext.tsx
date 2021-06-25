import React, {useContext, useState, useEffect} from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

interface AuthContextInterface {
    loginSource: string;
    isLoggedIn: boolean | undefined;
    isDeveloper: boolean;
    user: firebase.User | null;
    wentToLogin: (source: string) => void;
    login: (email: string, password: string, shouldRememberUser: boolean) => Promise<void | firebase.auth.UserCredential>,
    register: (email: string, password: string, shouldRememberUser: boolean) => Promise<void | firebase.auth.UserCredential>,
    logout: () => Promise<any>
}


const AuthContext = React.createContext<AuthContextInterface>({
    loginSource: "",
    isLoggedIn: undefined,
    isDeveloper: false,
    wentToLogin: (source: string) => {},
    user: null,
    login: (email: string, password: string, shouldRememberUser: boolean) => { return Promise.reject() },
    register: (email: string, password: string, shouldRememberUser: boolean) => { return Promise.reject() },
    logout: () => { return Promise.reject() }
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider: React.FC = ({children}) => {
    const [loginSource, setLoginSource] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean| undefined>(undefined);
    const [user, setUser] = useState<firebase.User | null>(null);
    const [isDeveloper, setIsDeveloper] = useState(false);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(function(newUser) {
            if (newUser && !newUser.isAnonymous) {
                firebase.firestore()
                    .collection("roles")
                    .doc("developer")
                    .get()
                    .then(_ => {
                        console.log("Is a developer.");
                        setIsDeveloper(true);
                    }).catch(e => {
                        console.error("Is not developer.");
                        setIsDeveloper(false);
                    });
                console.log(newUser);
                setIsLoggedIn(true);
                setUser(newUser);
            } else {
                setIsLoggedIn(false);
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
            logout: handleLogout, wentToLogin,
            register: handleRegister,
            loginSource,
            isDeveloper}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

