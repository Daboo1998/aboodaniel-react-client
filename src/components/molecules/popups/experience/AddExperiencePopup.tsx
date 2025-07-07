import React, {useState} from "react";
import Popup, {PopupProps} from "../Popup";
import TextInput from "../../../atoms/input/TextInput";
import TextAreaInput from "../../../atoms/input/TextAreaInput";
import NumberInput from "../../../atoms/input/NumberInput";
import Spacer from "../../../atoms/utilities/Spacer";
import DateInput from "../../../atoms/input/DateInput";
import Button, {ButtonSize, ButtonType} from "../../../atoms/buttons and links/Button";
import database, {Timestamp} from "../../../../data/database";
import Experience from "../../../../data/experience";
import {v4 as uuidv4} from 'uuid';
import {
    PopupContent,
    PopupTitle,
    StyledForm,
    OngoingContainer,
    OngoingLabel,
    OngoingCheckbox,
    DateInputsContainer,
    DateInputSpacer,
    RequiredFieldsText,
    RequiredAsterisk,
    ErrorMessage,
    ButtonContainer
} from "./AddExperiencePopup.styled";

export interface AddExperiencePopupProps extends PopupProps {
    onClose: (addedExperience?: Experience) => void
}

const AddExperiencePopup: React.FC<AddExperiencePopupProps> = (props) => {
    const [title, setTitle] = useState("");
    const [importance, setImportance] = useState(0);
    const [isOngoing, setIsOngoing] = useState(false);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("null");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [linkText, setLinkText] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleCancel: React.MouseEventHandler = (e) => {
        e.preventDefault();
        props.onClose();
    };

    const handleAddExperience: React.MouseEventHandler = (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        if (title.length === 0) {
            setErrorMessage("Title is required");
            return;
        }

        if (startDate.length === 0) {
            setErrorMessage("Start date is required");
            return;
        }

        if (!isOngoing && endDate.length === 0) {
            setErrorMessage("End date is required");
            return;
        }

        if (description.length === 0) {
            setErrorMessage("Start date is required");
            return;
        }

        if (importance < 0 || importance > 1000) {
            setErrorMessage("Importance range is 0-1000");
            return;
        }

        const newExperience: Experience = {
            importance,
            id: uuidv4(),
            title,
            startingDate: Timestamp.fromDate(new Date(Date.parse(startDate))),
            endDate: isOngoing ? "ongoing" : Timestamp.fromDate(new Date(Date.parse(endDate))),
            description,
            link,
            linkText
        };

        database.experiences.post(newExperience).then(() => {
            props.onClose(newExperience);
        }).catch(error => {
            setErrorMessage(error.message);
        })
    };

    return (
        <Popup isPopupShown={props.isPopupShown}>
            <Spacer />
            <PopupContent>
                <PopupTitle>Add Experience</PopupTitle>
                <StyledForm>
                    <NumberInput min={0} max={1000} name="importance" label="Importance [0-1000] (default 0)" value={importance} onChange={setImportance} required />
                    <TextInput name="title" label="Title" required onChange={setTitle} />
                    <OngoingContainer>
                        <OngoingLabel>Is ongoing</OngoingLabel>
                        <OngoingCheckbox type="checkbox" name="ongoing" onChange={e => setIsOngoing(e.target.checked)} />
                        <Spacer />
                    </OngoingContainer>
                    <DateInputsContainer>
                        <DateInput label="Start date" required name="startDate" onChange={setStartDate} />
                        {
                            !isOngoing ? <DateInput label="End date" name="endDate" onChange={setEndDate} required /> :
                                <DateInputSpacer />
                        }
                    </DateInputsContainer>
                    <TextAreaInput name="description" label="Description" onChange={setDescription} required />
                    <TextInput name="link" label="Link (optional)" onChange={setLink} />
                    <TextInput name="linkText" label="Link text (optional)" onChange={setLinkText} />
                    <RequiredFieldsText><RequiredAsterisk>*</RequiredAsterisk> Required fields</RequiredFieldsText>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                    <ButtonContainer>
                        <Button label="Add" size={ButtonSize.bigFullWidth} type={ButtonType.constructive} action={e => handleAddExperience(e)} />
                        <Button label="Cancel" size={ButtonSize.bigFullWidth} action={handleCancel} />
                    </ButtonContainer>
                </StyledForm>
            </PopupContent>
            <Spacer />
        </Popup>
    );
};

export default AddExperiencePopup;