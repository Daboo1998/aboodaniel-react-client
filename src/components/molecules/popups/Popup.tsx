import React from "react";
import ReactDOM from "react-dom";
import { PopupOverlay } from "./Popup.styled";

export interface PopupProps extends React.HTMLProps<any> {
    isPopupShown: boolean;
}

export const Popup: React.FC<PopupProps> = ({ children, isPopupShown }) => {
    if (!isPopupShown) return null;

    return ReactDOM.createPortal(
        <PopupOverlay $isShown={isPopupShown}>
            {children}
        </PopupOverlay>,
        document.body
    );
};

export default Popup;
