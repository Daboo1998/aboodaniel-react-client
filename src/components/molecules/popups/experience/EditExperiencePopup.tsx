import React, { useState, useEffect, useCallback, useRef } from "react";
import Popup, { PopupProps } from "../Popup";
import TextInput from "../../../atoms/input/TextInput";
import TextAreaInput from "../../../atoms/input/TextAreaInput";
import NumberInput from "../../../atoms/input/NumberInput";
import DateInput from "../../../atoms/input/DateInput";
import database, { Timestamp } from "../../../../data/database";
import Experience from "../../../../data/experience";
import { ReactComponent as CloseIcon } from "../../../../images/icons/closeIcon.svg";
import { PopupContent, HeaderRow, HeaderTitle, CloseButton, ErrorMessage, PopupFooter } from "../shared.styled";
import { StyledForm, FormBody, OngoingRow, OngoingCheckbox, DateRow, RequiredNote } from "./AddExperiencePopup.styled";

export interface EditExperiencePopupProps extends PopupProps {
    experience: Experience | null;
    onClose: (updatedExperience?: Experience) => void;
}

const EditExperiencePopup: React.FC<EditExperiencePopupProps> = (props) => {
    const [title, setTitle] = useState("");
    const [importance, setImportance] = useState(0);
    const [isOngoing, setIsOngoing] = useState(false);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [linkText, setLinkText] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const formBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.isPopupShown) {
            const timer = setTimeout(() => {
                if (formBodyRef.current) formBodyRef.current.scrollTop = 0;
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [props.isPopupShown]);

    useEffect(() => {
        if (props.experience) {
            setTitle(props.experience.title || "");
            setImportance(props.experience.importance || 0);
            setIsOngoing(props.experience.endDate === "ongoing");

            if (props.experience.startingDate) {
                setStartDate(props.experience.startingDate.toDate().toISOString().split('T')[0]);
            }

            if (props.experience.endDate && props.experience.endDate !== "ongoing") {
                setEndDate(props.experience.endDate.toDate().toISOString().split('T')[0]);
            } else {
                setEndDate("");
            }

            setDescription(props.experience.description || "");
            setLink(props.experience.link || "");
            setLinkText(props.experience.linkText || "");
            setErrorMessage(undefined);
        }
    }, [props.experience]);

    const handleClose = useCallback(() => {
        props.onClose();
    }, [props]);

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        if (!props.experience) { setErrorMessage("No experience to update"); return; }
        if (title.length === 0) { setErrorMessage("Title is required"); return; }
        if (startDate.length === 0) { setErrorMessage("Start date is required"); return; }
        if (!isOngoing && endDate.length === 0) { setErrorMessage("End date is required"); return; }
        if (description.length === 0) { setErrorMessage("Description is required"); return; }
        if (importance < 0 || importance > 1000) { setErrorMessage("Importance range is 0–1000"); return; }

        const updatedExperience: Experience = {
            ...props.experience,
            importance,
            title,
            startingDate: Timestamp.fromDate(new Date(Date.parse(startDate))),
            endDate: isOngoing ? "ongoing" : Timestamp.fromDate(new Date(Date.parse(endDate))),
            description,
            link,
            linkText
        };

        database.experiences.post(updatedExperience).then(() => {
            props.onClose(updatedExperience);
        }).catch(error => {
            setErrorMessage(error.message);
        });
    };

    return (
        <Popup isPopupShown={props.isPopupShown} onDismiss={handleClose}>
            <PopupContent>
                <HeaderRow>
                    <CloseButton onClick={handleClose} aria-label="Close">
                        <CloseIcon />
                    </CloseButton>
                    <HeaderTitle>Edit Experience</HeaderTitle>
                </HeaderRow>
                <StyledForm onSubmit={handleSubmit}>
                    <FormBody ref={formBodyRef}>
                        <NumberInput min={0} max={1000} name="importance" label="Importance [0-1000]" value={importance} onChange={setImportance} required />
                        <TextInput name="title" label="Title" value={title} required onChange={setTitle} />
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
                            <DateInput label="Start date" required name="startDate" value={startDate} onChange={setStartDate} />
                            {!isOngoing && <DateInput label="End date" name="endDate" value={endDate} onChange={setEndDate} required />}
                        </DateRow>
                        <TextAreaInput name="description" label="Description" value={description} onChange={setDescription} required />
                        <TextInput name="link" label="Link (optional)" value={link} onChange={setLink} />
                        <TextInput name="linkText" label="Link text (optional)" value={linkText} onChange={setLinkText} />
                        <RequiredNote><span className="req">*</span> Required fields</RequiredNote>
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    </FormBody>
                    <PopupFooter>
                        <button className="btn btn-primary" type="submit">Update <span className="arrow">→</span></button>
                        <button className="btn btn-ghost" type="button" onClick={handleClose}>Cancel</button>
                    </PopupFooter>
                </StyledForm>
            </PopupContent>
        </Popup>
    );
};

export default EditExperiencePopup;
