import React, {useContext, useState} from "react";

const AuthContext = React.createContext({
    isDeveloper: false,
    login: () => {},
    logout: () => {}
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider: React.FC = ({children}) => {
    const [isDeveloper, setIsDeveloper] = useState(false);

    const handleLogin = () => {
      setIsDeveloper(true)
    };

    const handleLogout = () => {
        setIsDeveloper(false);
    };

    return (
        <AuthContext.Provider value={{isDeveloper, login: handleLogin, logout: handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

