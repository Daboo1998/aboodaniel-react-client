import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";


export const NavigationContext = React.createContext({
    currentPageTitle: "",
    setCurrentPageTitle: (title: string) => {},
    navigateTo: (to: string) => {},
    goToLogin: (from: string) => {}
});

const NavigationProvider: React.FC = ({children}) => {
    const [currentPageTitle, setCurrentPageTitle] = useState("Home");
    const history = useHistory();
    const {wentToLogin} = useAuth();

    const navigateTo = (to: string) => {
        history.push(to);
    };

    const goToLogin = (from: string) => {
        history.push("/login");
        wentToLogin(from);
    };

    return (
        <NavigationContext.Provider value={{currentPageTitle, setCurrentPageTitle, navigateTo, goToLogin}}>
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationProvider;