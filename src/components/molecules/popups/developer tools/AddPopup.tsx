import Popup, { PopupProps } from "../Popup";
import React, { FormEventHandler, useState } from "react";
import { ReactComponent as CloseIcon } from "../../../../images/icons/closeIcon.svg";
import TextInput from "../../../atoms/input/TextInput";
import {
    PopupContent,
    HeaderRow,
    HeaderTitle,
    CloseButton,
    StyledForm,
    ErrorMessage
} from "./AddPopup.styled";

interface AddStringPopupProps extends PopupProps {
    fieldName: string;
    hide: () => void;
    onAdd?: (s: string) => void;
    errorMessage?: string
}

const AddStringPopup: React.FC<AddStringPopupProps> = ({ fieldName, isPopupShown, hide, onAdd, errorMessage }) => {
    const [newString, setNewString] = useState<string>("");

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        onAdd?.(newString);
        setNewString("");
    };

    const handleHide = () => {
        setNewString("");
        hide();
    };

    const title = `Add ${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`;

    return (
        <Popup isPopupShown={isPopupShown} onDismiss={handleHide}>
            <PopupContent $maxWidth="440px">
                <HeaderRow>
                    <CloseButton onClick={handleHide} aria-label="Close">
                        <CloseIcon />
                    </CloseButton>
                    <HeaderTitle>{title}</HeaderTitle>
                </HeaderRow>
                <StyledForm onSubmit={handleSubmit}>
                    <TextInput name={fieldName} value={newString} onChange={setNewString} label={fieldName} />
                    {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <button className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                        {title} <span className="arrow">→</span>
                    </button>
                </StyledForm>
            </PopupContent>
        </Popup>
    );
};

export default AddStringPopup;
