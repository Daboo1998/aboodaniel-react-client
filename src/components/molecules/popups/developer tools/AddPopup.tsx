import Popup, {PopupProps} from "../Popup";
import React, {FormEventHandler, useState} from "react";
import Spacer from "../../../atoms/utilities/Spacer";
import {ReactComponent as CloseIcon} from "../../../../images/icons/closeIcon.svg";
import Button, {ButtonType} from "../../../atoms/buttons and links/Button";
import TextInput from "../../../atoms/input/TextInput";

interface AddStringPopupProps extends PopupProps {
    fieldName: string;
    hide: () => void;
    onAdd?: (s: string) => void;
    errorMessage?: string
}

const AddStringPopup: React.FC<AddStringPopupProps> = ({fieldName, isPopupShown, hide, onAdd, errorMessage}) => {
    const [newString, setNewString] = useState<string>("");

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        onAdd?.(newString);
    };

    return (
        <Popup isPopupShown={isPopupShown}>
            <Spacer />
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl <md:w-full <md:h-full">
                <div className="flex flex-row items-center">
                    <Spacer />
                    <button className="self-end" onClick={hide}><CloseIcon /></button>
                </div>
                <form onSubmit={handleSubmit} className="items-center">
                    <TextInput name={fieldName} onChange={setNewString} label={fieldName} />
                    {!!errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
                    <Button className="w-full px-5 py-2" label="Add" type={ButtonType.constructive} />
                </form>
            </div>
            <Spacer />
        </Popup>
    );
};

export default AddStringPopup;