import React from "react";
import styled from "styled-components";

export interface PopupProps extends React.HTMLProps<any> {
    isPopupShown: boolean;
}

export const Popup: React.FC<PopupProps> = ({children, isPopupShown}) => {
    if (!isPopupShown) return null;

    return <Overlay>{children}</Overlay>;
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(249, 250, 251, 0.8); /* gray-100 with opacity */

  /* prefer dark mode styles via media query if needed */
  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export default Popup;