import React, { useState, useCallback, useEffect } from "react";
import Popup, { PopupProps } from "../Popup";
import TextInput from "../../../atoms/input/TextInput";
import database from "../../../../data/database";
import EducationItem from "../../../../data/EducationItem";
import { ReactComponent as CloseIcon } from "../../../../images/icons/closeIcon.svg";
import { PopupContent, HeaderRow, HeaderTitle, CloseButton, ErrorMessage, PopupFooter } from "../shared.styled";
import { StyledForm, FormBody, RequiredNote } from "../experience/AddExperiencePopup.styled";

export interface EditEducationPopupProps extends PopupProps {
    education: EducationItem | null;
    onClose: (updatedEducation?: EducationItem) => void;
}

const EditEducationPopup: React.FC<EditEducationPopupProps> = (props) => {
    const [qualification, setQualification] = useState("");
    const [place, setPlace] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (props.education) {
            setQualification(props.education.qualification || "");
            setPlace(props.education.place || "");
            setStartYear(props.education.startYear || "");
            setEndYear(props.education.endYear || "");
            setErrorMessage(undefined);
        }
    }, [props.education]);

    const handleClose = useCallback(() => { props.onClose(); }, [props]);

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        if (!props.education) { setErrorMessage("No education item selected."); return; }
        if (!qualification || !place || !startYear || !endYear) {
            setErrorMessage("Please fill all required fields."); return;
        }

        const startNum = parseInt(startYear);
        const endNum = endYear === "ongoing" ? new Date().getFullYear() : parseInt(endYear);
        if (isNaN(startNum) || (!isNaN(endNum) && startNum > endNum)) {
            setErrorMessage("Start year must be before end year."); return;
        }

        const updatedEducation: EducationItem = { id: props.education.id, qualification, place, startYear, endYear };

        database.education.post(updatedEducation)
            .then(() => props.onClose(updatedEducation))
            .catch(() => setErrorMessage("Failed to update education. Please try again."));
    };

    return (
        <Popup isPopupShown={props.isPopupShown} onDismiss={handleClose}>
            <PopupContent>
                <HeaderRow>
                    <CloseButton onClick={handleClose} aria-label="Close">
                        <CloseIcon />
                    </CloseButton>
                    <HeaderTitle>Edit Education</HeaderTitle>
                </HeaderRow>
                <StyledForm onSubmit={handleSubmit}>
                    <FormBody>
                        <TextInput name="qualification" label="Qualification / Degree" value={qualification} onChange={setQualification} required placeholder="e.g., Bachelor of Science in Computer Science" />
                        <TextInput name="place" label="Institution" value={place} onChange={setPlace} required placeholder="e.g., University of Example" />
                        <TextInput name="startYear" label="Start Year" value={startYear} onChange={setStartYear} required placeholder="e.g., 2017" />
                        <TextInput name="endYear" label="End Year" value={endYear} onChange={setEndYear} required placeholder="e.g., 2021 or ongoing" />
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

export default EditEducationPopup;
