import React, {useContext, useState} from "react";
import { ReactComponent as MenuIcon } from "../../../images/icons/menuIcon.svg";
import { ReactComponent as CloseIcon } from "../../../images/icons/closeIcon.svg"
import {PageNavigatorContext} from "../../pageNavigator/PageNavigator";
import Spacer from "../../atoms/Spacer";
import {useAuth} from "../../../contexts/AuthContext";

export const PageNavigatorBarContext = React.createContext({
    isHidden: false,
    hide: () => {}
});

const PageNavigatorBar: React.FC = ({children}) => {
    const [isHidden, setIsHidden] = useState(true);
    const { currentTitle } = useContext(PageNavigatorContext);

    const {isDeveloper, login, logout} = useAuth();

    const handleLogin = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isDeveloper) {
            logout();
        } else {
            login()
        }
    };

    return (<PageNavigatorBarContext.Provider value={{isHidden, hide: () => setIsHidden(true)}}>
      <div className={`flex flex-col >md:flex-row ${isHidden ? "" : "border-b"} >md:border-b border-black fixed w-full top-0 bg-white z-10`}>
          <div className="flex flex-row >md:hidden bg-white w-10 h-14 border-b border-black w-full">
              <button className="border-0 p-2 w-10 pl-6" onClick={(_) => setIsHidden(!isHidden)}>
                  {isHidden ? <MenuIcon width="15px" /> : <CloseIcon width="15px" />}
              </button>
              <h3 className="h-full p-3.5 pl-6">{currentTitle}</h3>
          </div>
          <div className={
              `flex flex-col >md:flex-row
              ${isHidden ? "<md:h-0" : "<md:h-screen"}
              <md:overflow-hidden <md:transition-height <md:duration-500 <md:ease-in-out`
          }>
              {children}
              <Spacer />
              <button className="pb-20 >md:hidden" onClick={handleLogin}>{isDeveloper ? "Log Out" : "Log In"}</button>
          </div>
          <Spacer />
          <button className="pr-4 <md:hidden" onClick={handleLogin}>{isDeveloper ? "Log Out" : "Log In"}</button>
      </div>
    </PageNavigatorBarContext.Provider>);
};

export default PageNavigatorBar;