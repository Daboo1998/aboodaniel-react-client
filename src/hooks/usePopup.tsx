import {useState} from "react";

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