import React, { useState, useEffect } from "react";
import { ReactComponent as MenuIcon } from "../../../images/icons/menuIcon.svg";
import { ReactComponent as CloseIcon } from "../../../images/icons/closeIcon.svg";
import useNavigation from "../../../hooks/useNavigation";
import Footer from "./Footer";
import { trapFocus } from "../../../utils/accessibility";
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
  const navigationRef = React.useRef<HTMLDivElement>(null);

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

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isHidden) {
        setIsHidden(true);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isHidden]);

  // Trap focus when menu is open
  useEffect(() => {
    if (!isHidden && navigationRef.current) {
      const cleanup = trapFocus(navigationRef.current);
      return cleanup;
    }
  }, [isHidden]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const hide = () => {
    setIsHidden(true);
  };

  return (
    <PageNavigatorBarContext.Provider value={{ isHidden, hide }}>
      <NavigatorContainer 
        ref={navigationRef}
        $isHidden={isHidden} 
        as="nav"
        aria-label="Main navigation"
      >
        <MobileHeader>
          <MenuButton 
            onClick={toggleHidden}
            aria-label={isHidden ? "Open navigation menu" : "Close navigation menu"}
            aria-expanded={!isHidden}
            aria-controls="navigation-content"
          >
            {isHidden ? <MenuIcon width="15px" /> : <CloseIcon width="15px" />}
          </MenuButton>
          <PageTitle aria-current="page">{navigation.currentPageTitle}</PageTitle>
        </MobileHeader>
        <BrandTitle 
          onClick={() => navigation.navigateTo("/")}
          role="link"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigation.navigateTo("/");
            }
          }}
          aria-label="Go to home page"
        >
          Daniel Aboo
        </BrandTitle>
        <NavigationContent 
          $isHidden={isHidden}
          id="navigation-content"
          aria-hidden={isHidden}
        >
          <NavigationContentWrapper 
            $isHidden={isHidden}
            role="list"
          >
            {children}
          </NavigationContentWrapper>
          <Footer isInsideMenu={true} />
        </NavigationContent>
      </NavigatorContainer>
    </PageNavigatorBarContext.Provider>
  );
};

export default PageNavigatorBar;
