import React, { useState, useEffect } from "react";
import { ReactComponent as MenuIcon } from "../../../images/icons/menuIcon.svg";
import { ReactComponent as CloseIcon } from "../../../images/icons/closeIcon.svg";
import useNavigation from "../../../hooks/useNavigation";
import Footer from "./Footer";
import {
  NavigatorContainer,
  MobileHeader,
  MenuButton,
  PageTitle,
  BrandTitle,
  NavigationContent,
  NavigationContentWrapper,
} from "./PageNavigatorBar.styled";

export const PageNavigatorBarContext = React.createContext({
  isHidden: false,
  hide: () => {},
});

const PageNavigatorBar: React.FC<React.DOMAttributes<HTMLDivElement>> = ({
  children,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const navigation = useNavigation();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (!isHidden) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isHidden]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const hide = () => {
    setIsHidden(true);
  };

  return (
    <PageNavigatorBarContext.Provider value={{ isHidden, hide }}>
      <NavigatorContainer $isHidden={isHidden}>
        <MobileHeader>
          <MenuButton onClick={toggleHidden}>
            {isHidden ? <MenuIcon width="15px" /> : <CloseIcon width="15px" />}
          </MenuButton>
          <PageTitle>{navigation.currentPageTitle}</PageTitle>
        </MobileHeader>
        <BrandTitle onClick={() => navigation.navigateTo("/")}>
          Daniel Aboo
        </BrandTitle>
        <NavigationContent $isHidden={isHidden}>
          <NavigationContentWrapper $isHidden={isHidden}>
            {children}
          </NavigationContentWrapper>
          <Footer isInsideMenu={true} />
        </NavigationContent>
      </NavigatorContainer>
    </PageNavigatorBarContext.Provider>
  );
};

export default PageNavigatorBar;
