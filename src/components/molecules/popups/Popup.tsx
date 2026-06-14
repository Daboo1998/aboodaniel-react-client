import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { PopupOverlay } from "./Popup.styled";
import { trapFocus } from "../../../utils/accessibility";

export interface PopupProps extends React.HTMLProps<any> {
    isPopupShown: boolean;
    onDismiss?: () => void;
}

export const Popup: React.FC<PopupProps> = ({ children, isPopupShown, onDismiss }) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isPopupShown) return;
        if (onDismiss) {
            const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onDismiss(); };
            document.addEventListener('keydown', handler);
            return () => document.removeEventListener('keydown', handler);
        }
    }, [onDismiss, isPopupShown]);

    useEffect(() => {
        if (isPopupShown && dialogRef.current) {
            return trapFocus(dialogRef.current);
        }
    }, [isPopupShown]);

    // Prevent the background page from scrolling while the popup is open.
    // position:fixed is required on iOS Safari where overflow:hidden on body alone has no effect.
    useEffect(() => {
        if (!isPopupShown) return;
        const scrollY = window.scrollY;
        const body = document.body;
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.width = '100%';
        return () => {
            body.style.overflow = '';
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            window.scrollTo(0, scrollY);
        };
    }, [isPopupShown]);

    if (!isPopupShown) return null;

    return ReactDOM.createPortal(
        <PopupOverlay $isShown={isPopupShown} onClick={onDismiss}>
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </PopupOverlay>,
        document.body
    );
};

export default Popup;
