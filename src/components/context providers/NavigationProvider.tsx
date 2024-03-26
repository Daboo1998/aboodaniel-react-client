import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const NavigationContext = React.createContext({
  currentPageTitle: "",
  currentPage: "/",
  setCurrentPageTitle: (title: string) => {},
  navigateTo: (to: string) => {},
  goToLogin: (from: string) => {},
});

const NavigationProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [currentPageTitle, setCurrentPageTitle] = useState("Home");
  const [currentPage, setCurrentPage] = useState(history.location.pathname);
  const { wentToLogin } = useAuth();

  const navigateTo = (to: string) => {
    history.push(to);
    setCurrentPage(to);
  };

  const goToLogin = (from: string) => {
    history.push("/login");
    setCurrentPage("/login");
    wentToLogin(from);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPageTitle,
        currentPage,
        setCurrentPageTitle,
        navigateTo,
        goToLogin,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
