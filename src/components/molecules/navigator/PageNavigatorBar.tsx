import React, {useState} from "react";
import { ReactComponent as MenuIcon } from "../../../images/icons/menuIcon.svg";
import { ReactComponent as CloseIcon } from "../../../images/icons/closeIcon.svg"
import {useAuth} from "../../../contexts/AuthContext";
import Spacer from "../../atoms/Spacer";
import {useHistory} from "react-router-dom";

export const PageNavigatorBarContext = React.createContext({
    isHidden: false,
    currentTitle: "",
    setCurrentTitle: (title: string) => {},
    hide: () => {}
});

const PageNavigatorBar: React.FC = ({children}) => {
    const [isHidden, setIsHidden] = useState(true);
    const [currentTitle, setCurrentTitle] = useState("Home");
    const history = useHistory();

    const {logout, wentToLogin, isLoggedIn, user} = useAuth();

    const handleLogin = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isLoggedIn) {
            logout().then(_ => {
                console.log("Signed Out");
                history.push("/");
            });
        } else {
            wentToLogin(history.location.pathname);
            history.push("/login");
        }

        setIsHidden(true);
    };

    return (<PageNavigatorBarContext.Provider value={{isHidden, currentTitle, hide: () => setIsHidden(true), setCurrentTitle}}>
      <div className={`flex flex-col >md:flex-row ${isHidden ? "" : "border-b"} >md:border-b border-black fixed w-full <md:h-full top-0 z-10`}>
          <div className="flex flex-row >md:hidden bg-white w-10 h-14 border-b border-black w-full">
              <button className="border-0 p-2 w-10 pl-6" onClick={(_) => setIsHidden(!isHidden)}>
                  {isHidden ? <MenuIcon width="15px" /> : <CloseIcon width="15px" />}
              </button>
              <h3 className="h-full p-3.5 pl-6">{currentTitle}</h3>
          </div>
          <div className={
              `flex flex-col >md:flex-row >md:w-full bg-white >md:items-center
              ${isHidden ? "<md:h-0" : "<md:h-screen"}
              <md:overflow-hidden <md:transition-height <md:duration-500 <md:ease-in-out`
          }>
              {children}
              <Spacer />
              { user && <p className="<md:py-2 text-center text-blue-800">{user?.displayName ? user.displayName : user?.uid}</p> }
              <button className=">md:px-4 <md:py-4" onClick={handleLogin}>{isLoggedIn ? "Log Out" : "Log In"}</button>
          </div>
      </div>
    </PageNavigatorBarContext.Provider>);
};

export default PageNavigatorBar;
