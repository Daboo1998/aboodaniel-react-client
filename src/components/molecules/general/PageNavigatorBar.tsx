import React, { useState } from "react";
import { ReactComponent as MenuIcon } from "../../../images/icons/menuIcon.svg";
import { ReactComponent as CloseIcon } from "../../../images/icons/closeIcon.svg";
import useNavigation from "../../../hooks/useNavigation";

export const PageNavigatorBarContext = React.createContext({
  isHidden: false,
  hide: () => {},
});

const PageNavigatorBar: React.FC = ({ children }) => {
  const [isHidden, setIsHidden] = useState(true);
  const navigation = useNavigation();

  return (
    <PageNavigatorBarContext.Provider
      value={{ isHidden, hide: () => setIsHidden(true) }}
    >
      <div
        className={`flex flex-col >md:flex-row ${
          isHidden ? "" : "border-b <md:h-full"
        } >md:shadow-md border-black fixed w-full top-0 z-10 `}
      >
        <div className="flex flex-row >md:hidden bg-background-light dark:bg-background-dark w-10 h-14 w-full">
          <button
            className="border-0 p-2 w-10 pl-6"
            onClick={(_) => setIsHidden(!isHidden)}
          >
            {isHidden ? <MenuIcon width="15px" /> : <CloseIcon width="15px" />}
          </button>
          <h3 className="h-full p-3.5 pl-6">{navigation.currentPageTitle}</h3>
        </div>
        <h3
          className="whitespace-nowrap self-center p-4 absolute h-full cursor-pointer <md:justify-self-center"
          onClick={() => navigation.navigateTo("/")}
        >
          Daniel Aboo
        </h3>
        <div
          className={`flex flex-col >md:flex-row >md:w-full bg-background-light dark:bg-background-dark >md:items-center >md:justify-center
              ${isHidden ? "<md:h-0" : "<md:h-screen"}
              <md:overflow-hidden <md:transition-height <md:duration-500 <md:ease-in-out`}
        >
          {children}
        </div>
      </div>
    </PageNavigatorBarContext.Provider>
  );
};

export default PageNavigatorBar;
