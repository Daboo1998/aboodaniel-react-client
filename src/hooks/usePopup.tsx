import React, {useState, useContext} from "react";
import Spacer from "../components/atoms/Spacer";

export interface PopupProps {
    isPopupShown: boolean;
}

export const Popup: React.FC<PopupProps> = ({children, isPopupShown}) => {
    if (isPopupShown) {
        return (
            <div className={`z-50 w-screen h-screen bg-gray-100 bg-opacity-80 flex flex-col fixed top-0 left-0 items-center ${!isPopupShown && "hidden"}`}>
                <Spacer />
                <div className="w-min h-min bg-white">
                    {children}
                </div>
                <Spacer />
            </div>
        );
    }

    return null;
};

const usePopup: () => [boolean, ()=> void, () => void] = () => {
    const [isPopupShown, setShowPopup] = useState<boolean>(false);

    const showPopup = () => {
        setShowPopup(true);
    };

    const hidePopup = () => {
        setShowPopup(false);
    };

    return [isPopupShown, showPopup, hidePopup];
};

export default usePopup;