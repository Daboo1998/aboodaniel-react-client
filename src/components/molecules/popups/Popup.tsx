import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { PopupOverlay } from "./Popup.styled";

export interface PopupProps extends React.HTMLProps<any> {
    isPopupShown: boolean;
    onDismiss?: () => void;
}

export const Popup: React.FC<PopupProps> = ({ children, isPopupShown, onDismiss }) => {
    useEffect(() => {
        if (!onDismiss || !isPopupShown) return;
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onDismiss(); };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [onDismiss, isPopupShown]);

    if (!isPopupShown) return null;

    return ReactDOM.createPortal(
        <PopupOverlay $isShown={isPopupShown} onClick={onDismiss}>
            <div onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </PopupOverlay>,
        document.body
    );
};

export default Popup;
