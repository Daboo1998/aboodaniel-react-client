import React, { useState } from "react";
import Popup, { PopupProps } from "../Popup";
import TextInput from "../../../atoms/input/TextInput";
import TextAreaInput from "../../../atoms/input/TextAreaInput";
import NumberInput from "../../../atoms/input/NumberInput";
import DateInput from "../../../atoms/input/DateInput";
import database, { Timestamp } from "../../../../data/database";
import Experience from "../../../../data/experience";
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as CloseIcon } from "../../../../images/icons/closeIcon.svg";
import {
    PopupContent,
    HeaderRow,
    HeaderTitle,
    CloseButton,
    StyledForm,
    FormBody,
    OngoingRow,
    OngoingCheckbox,
    DateRow,
    RequiredNote,
    ErrorMessage,
    FormFooter
} from "./AddExperiencePopup.styled";

export interface AddExperiencePopupProps extends PopupProps {
    onClose: (addedExperience?: Experience) => void
}

const AddExperiencePopup: React.FC<AddExperiencePopupProps> = (props) => {
    const [title, setTitle] = useState("");
    const [importance, setImportance] = useState(0);
    const [isOngoing, setIsOngoing] = useState(false);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [linkText, setLinkText] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleClose = () => props.onClose();

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        if (title.length === 0) { setErrorMessage("Title is required"); return; }
        if (startDate.length === 0) { setErrorMessage("Start date is required"); return; }
        if (!isOngoing && endDate.length === 0) { setErrorMessage("End date is required"); return; }
        if (description.length === 0) { setErrorMessage("Description is required"); return; }
        if (importance < 0 || importance > 1000) { setErrorMessage("Importance range is 0–1000"); return; }

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
        });
    };

    return (
        <Popup isPopupShown={props.isPopupShown}>
            <PopupContent>
                <HeaderRow>
                    <CloseButton onClick={handleClose} aria-label="Close">
                        <CloseIcon />
                    </CloseButton>
                    <HeaderTitle>Add Experience</HeaderTitle>
                </HeaderRow>
                <StyledForm onSubmit={handleSubmit}>
                    <FormBody>
                        <NumberInput min={0} max={1000} name="importance" label="Importance [0-1000]" value={importance} onChange={setImportance} required />
                        <TextInput name="title" label="Title" required onChange={setTitle} />
                        <OngoingRow onClick={() => setIsOngoing(v => !v)}>
                            <OngoingCheckbox
                                type="checkbox"
                                name="ongoing"
                                checked={isOngoing}
                                onChange={e => setIsOngoing(e.target.checked)}
                                onClick={e => e.stopPropagation()}
                            />
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-2)' }}>Is ongoing</span>
                        </OngoingRow>
                        <DateRow>
                            <DateInput label="Start date" required name="startDate" onChange={setStartDate} />
                            {!isOngoing && <DateInput label="End date" name="endDate" onChange={setEndDate} required />}
                        </DateRow>
                        <TextAreaInput name="description" label="Description" onChange={setDescription} required />
                        <TextInput name="link" label="Link (optional)" onChange={setLink} />
                        <TextInput name="linkText" label="Link text (optional)" onChange={setLinkText} />
                        <RequiredNote><span style={{ color: 'oklch(0.62 0.2 25)' }}>*</span> Required fields</RequiredNote>
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    </FormBody>
                    <FormFooter>
                        <button className="btn btn-primary" type="submit">Add <span className="arrow">→</span></button>
                        <button className="btn btn-ghost" type="button" onClick={handleClose}>Cancel</button>
                    </FormFooter>
                </StyledForm>
            </PopupContent>
        </Popup>
    );
};

export default AddExperiencePopup;
