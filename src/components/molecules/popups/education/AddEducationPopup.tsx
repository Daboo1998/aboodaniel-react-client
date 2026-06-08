import React, { useState, useCallback } from "react";
import Popup, { PopupProps } from "../Popup";
import TextInput from "../../../atoms/input/TextInput";
import database from "../../../../data/database";
import EducationItem from "../../../../data/EducationItem";
import { generateId } from "../../../../utils/accessibility";
import { ReactComponent as CloseIcon } from "../../../../images/icons/closeIcon.svg";
import { PopupContent, HeaderRow, HeaderTitle, CloseButton, ErrorMessage, PopupFooter } from "../shared.styled";
import { StyledForm, FormBody, RequiredNote } from "../experience/AddExperiencePopup.styled";

export interface AddEducationPopupProps extends PopupProps {
    onClose: (addedEducation?: EducationItem) => void;
}

const AddEducationPopup: React.FC<AddEducationPopupProps> = (props) => {
    const [qualification, setQualification] = useState("");
    const [place, setPlace] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const { onClose } = props;
    const handleClose = useCallback(() => {
        setQualification(""); setPlace(""); setStartYear(""); setEndYear(""); setErrorMessage(undefined);
        onClose();
    }, [onClose]);

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        if (!qualification || !place || !startYear || !endYear) {
            setErrorMessage("Please fill all required fields."); return;
        }

        const startNum = parseInt(startYear);
        const endNum = endYear === "ongoing" ? new Date().getFullYear() : parseInt(endYear);
        if (isNaN(startNum) || (endYear !== "ongoing" && isNaN(endNum)) || (!isNaN(endNum) && startNum > endNum)) {
            setErrorMessage("Please enter valid numeric years (or 'ongoing' for end year)."); return;
        }

        const newEducation: EducationItem = { id: generateId('education'), qualification, place, startYear, endYear };

        database.education.post(newEducation)
            .then(() => {
                onClose(newEducation);
                setQualification(""); setPlace(""); setStartYear(""); setEndYear(""); setErrorMessage(undefined);
            })
            .catch(() => setErrorMessage("Failed to add education. Please try again."));
    };

    return (
        <Popup isPopupShown={props.isPopupShown} onDismiss={handleClose}>
            <PopupContent>
                <HeaderRow>
                    <CloseButton onClick={handleClose} aria-label="Close">
                        <CloseIcon />
                    </CloseButton>
                    <HeaderTitle>Add Education</HeaderTitle>
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
                        <button className="btn btn-primary" type="submit">Add <span className="arrow">→</span></button>
                        <button className="btn btn-ghost" type="button" onClick={handleClose}>Cancel</button>
                    </PopupFooter>
                </StyledForm>
            </PopupContent>
        </Popup>
    );
};

export default AddEducationPopup;
