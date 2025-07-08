import React from "react";
import { PopupOverlay } from "./Popup.styled";

export interface PopupProps extends React.HTMLProps<any> {
    isPopupShown: boolean;
}

export const Popup: React.FC<PopupProps> = ({ children, isPopupShown }) => {
    if (isPopupShown) {
        return (
            <PopupOverlay $isShown={isPopupShown}>
                {children}
            </PopupOverlay>
        );
    }

    return null;
};

export default Popup;