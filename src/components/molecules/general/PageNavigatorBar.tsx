import React, { useState } from "react";
import { ReactComponent as MenuIcon } from "../../../images/icons/menuIcon.svg";
import { ReactComponent as CloseIcon } from "../../../images/icons/closeIcon.svg";
import useNavigation from "../../../hooks/useNavigation";
import Footer from "./Footer";
import styled, { css } from "styled-components";
import { media } from "../../../utils/media";

export const PageNavigatorBarContext = React.createContext({
  isHidden: false,
  hide: () => {},
});

const PageNavigatorBar: React.FC<React.DOMAttributes<HTMLDivElement>> = ({
  children,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const navigation = useNavigation();

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <PageNavigatorBarContext.Provider
      value={{ isHidden, hide: () => setIsHidden(true) }}
    >
      <Wrapper $isHidden={isHidden}>
        <MobileBar>
          <ToggleButton onClick={toggleHidden}>
            {isHidden ? <MenuIcon width="15px" /> : <CloseIcon width="15px" />}
          </ToggleButton>
          <MobileTitle>{navigation.currentPageTitle}</MobileTitle>
        </MobileBar>

        <DesktopTitle onClick={() => navigation.navigateTo("/")}>Daniel Aboo</DesktopTitle>

        <NavContainer $isHidden={isHidden}>
          {children}
          {!isHidden && <Footer isInsideMenu />}
        </NavContainer>
      </Wrapper>
    </PageNavigatorBarContext.Provider>
  );
};

export default PageNavigatorBar;

// ---------------------------- styled components ---------------------------

interface HiddenProps { $isHidden: boolean; }

const Wrapper = styled.div<HiddenProps>`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  border-color: black;

  ${({ $isHidden }) =>
    !$isHidden &&
    css`
      border-bottom: 1px solid black;
      height: 100%;
    `}

  ${media.up("md")} {
    flex-direction: row;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
    border-bottom: none;
    height: auto;
  }
`;

const MobileBar = styled.div`
  display: flex;
  flex-direction: row;
  background: ${({ theme }) => theme.colors.backgroundLight};
  width: 100%;
  height: 3.5rem; /* 14 */

  ${media.up("md")} {
    display: none;
  }
`;

const ToggleButton = styled.button`
  border: none;
  background: none;
  padding: 0.5rem;
  width: 2.5rem; /* w-10 */
  padding-left: 1.5rem; /* pl-6 */
`;

const MobileTitle = styled.h3`
  height: 100%;
  padding: 0.875rem; /* p-3.5 ~14px */
  padding-left: 1.5rem; /* pl-6 */
`;

const DesktopTitle = styled.h3`
  white-space: nowrap;
  align-self: center;
  padding: 1rem; /* p-4 */
  position: absolute;
  height: 100%;
  cursor: pointer;

  ${media.down && media.down("md") ? media.down("md") : ""} {
    display: none;
  }
`;

const NavContainer = styled.div<HiddenProps>`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.backgroundLight};

  ${media.up("md")} {
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  /* Mobile hide / show */
  ${media.down && media.down("md") ? media.down("md") : ""} {
    overflow: hidden;
    max-height: ${({ $isHidden }) => ($isHidden ? "0" : "100vh")};
    transition: max-height 0.5s ease-in-out;
  }
`;
