import Popup, { PopupProps } from "../Popup";
import React, { FormEventHandler, useState } from "react";
import Spacer from "../../../atoms/utilities/Spacer";
import { ReactComponent as CloseIcon } from "../../../../images/icons/closeIcon.svg";
import Button, { ButtonType } from "../../../atoms/buttons and links/Button";
import TextInput from "../../../atoms/input/TextInput";
import {
    PopupContent,
    HeaderRow,
    CloseButton,
    StyledForm,
    ErrorMessage,
    SubmitButtonContainer
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
    };

    return (
        <Popup isPopupShown={isPopupShown}>
            <Spacer />
            <PopupContent>
                <HeaderRow>
                    <Spacer />
                    <CloseButton onClick={hide}>
                        <CloseIcon />
                    </CloseButton>
                </HeaderRow>
                <StyledForm onSubmit={handleSubmit}>
                    <TextInput name={fieldName} onChange={setNewString} label={fieldName} />
                    {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <SubmitButtonContainer>
                        <Button label="Add" type={ButtonType.constructive} submit />
                    </SubmitButtonContainer>
                </StyledForm>
            </PopupContent>
            <Spacer />
        </Popup>
    );
};

export default AddStringPopup;