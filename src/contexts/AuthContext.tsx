import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";

const AuthContext = React.createContext({
    isDeveloper: false,
    loginSource: "",
    wentToLogin: (source: string) => {},
    login: () => {},
    logout: () => {}
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider: React.FC = ({children}) => {
    const [isDeveloper, setIsDeveloper] = useState(false);
    const [loginSource, setLoginSource] = useState<string>("");

    const handleLogin = () => {
        setIsDeveloper(true);
    };

    const handleLogout = () => {
        setIsDeveloper(false);
    };

    const wentToLogin = (source: string) => {
        setLoginSource(source);
    };

    return (
        <AuthContext.Provider value={{isDeveloper, login: handleLogin, logout: handleLogout, wentToLogin, loginSource}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

