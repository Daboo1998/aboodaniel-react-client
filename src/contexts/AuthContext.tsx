import React, {useContext, useState} from "react";
import firebase from "firebase";

interface AuthContextInterface {
    loginSource: string;
    isLoggedIn: boolean | undefined;
    isDeveloper: boolean;
    user: firebase.User | null;
    wentToLogin: (source: string) => void;
    login: (email: string, password: string) => Promise<void | firebase.auth.UserCredential>,
    logout: () => Promise<any>
}


const AuthContext = React.createContext<AuthContextInterface>({
    loginSource: "",
    isLoggedIn: undefined,
    isDeveloper: false,
    wentToLogin: (source: string) => {},
    user: null,
    login: (email: string, password: string) => { return Promise.reject() },
    logout: () => { return Promise.reject() }
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider: React.FC = ({children}) => {
    const [loginSource, setLoginSource] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
    const [user, setUser] = useState<firebase.User | null>(null);
    const [isDeveloper, setIsDeveloper] = useState(false);

    firebase.auth().onAuthStateChanged(function(newUser) {
        if (newUser) {
            firebase.firestore()
                .collection("roles")
                .where("users", "array-contains", newUser.uid)
                .get()
                .then(result => {
                   if (!result.empty) {
                       setIsDeveloper(true);
                   }
                });

            setIsLoggedIn(true);
            setUser(newUser);
        } else {
            setIsLoggedIn(false);
            setIsDeveloper(false);
            setUser(null);
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
        <AuthContext.Provider value={{ user, isLoggedIn, login: handleLogin, logout: handleLogout, wentToLogin, loginSource, isDeveloper}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

