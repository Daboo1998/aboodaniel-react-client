import React from "react";

export interface PopupProps extends React.HTMLProps<any> {
    isPopupShown: boolean;
}

export const Popup: React.FC<PopupProps> = ({children, isPopupShown}) => {
    if (isPopupShown) {
        return (
            <div className={`z-50 w-screen h-screen bg-gray-100 dark:bg-black bg-opacity-80 flex flex-col fixed  top-0 left-0 items-center ${!isPopupShown && "hidden"}`}>
                {children}
            </div>
        );
    }

    return null;
};

export default Popup;