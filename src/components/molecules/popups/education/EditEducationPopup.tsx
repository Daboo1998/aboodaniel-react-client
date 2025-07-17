import React, { useState, useRef, useEffect, useCallback } from "react";
import Popup, { PopupProps } from "../Popup";
import TextInput from "../../../atoms/input/TextInput";
import Button, { ButtonSize, ButtonType } from "../../../atoms/buttons and links/Button";
import database from "../../../../data/database";
import EducationItem from "../../../../data/EducationItem";
import {
    PopupContent,
    PopupTitle,
    StyledForm,
    RequiredFieldsText,
    RequiredAsterisk,
    ErrorMessage,
    ButtonContainer,
    CloseButton
} from "../experience/AddExperiencePopup.styled";

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
    const popupContentRef = useRef<HTMLDivElement>(null);

    // Pre-populate form when education prop changes
    useEffect(() => {
        if (props.education) {
            setQualification(props.education.qualification || "");
            setPlace(props.education.place || "");
            setStartYear(props.education.startYear || "");
            setEndYear(props.education.endYear || "");
        }
    }, [props.education]);

    const handleCancel = useCallback(() => {
        // Reset form
        setQualification("");
        setPlace("");
        setStartYear("");
        setEndYear("");
        setErrorMessage(undefined);
        props.onClose();
    }, [props]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && props.isPopupShown) {
                handleCancel();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [props.isPopupShown, handleCancel]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popupContentRef.current && !popupContentRef.current.contains(e.target as Node)) {
                handleCancel();
            }
        };

        if (props.isPopupShown) {
            setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside);
            }, 100);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [props.isPopupShown, handleCancel]);

    const handleUpdateEducation: React.MouseEventHandler = (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        if (!props.education) {
            setErrorMessage("No education item selected.");
            return;
        }

        // Validate
        if (!qualification || !place || !startYear || !endYear) {
            setErrorMessage("Please fill all required fields.");
            return;
        }

        // Validate years
        const startYearNum = parseInt(startYear);
        const endYearNum = endYear === "ongoing" ? new Date().getFullYear() : parseInt(endYear);
        
        if (isNaN(startYearNum) || (!isNaN(endYearNum) && startYearNum > endYearNum)) {
            setErrorMessage("Please enter valid years (start year must be before end year).");
            return;
        }

        const updatedEducation: EducationItem = {
            id: props.education.id,
            qualification,
            place,
            startYear,
            endYear
        };

        database.education
            .post(updatedEducation)
            .then(() => {
                props.onClose(updatedEducation);
            })
            .catch((error) => {
                console.error("Error updating education:", error);
                setErrorMessage("Failed to update education. Please try again.");
            });
    };

    return (
        <Popup isPopupShown={props.isPopupShown}>
            <PopupContent ref={popupContentRef}>
                <CloseButton onClick={handleCancel} aria-label="Close popup">
                    ×
                </CloseButton>
                <PopupTitle>Edit Education</PopupTitle>
                <StyledForm>
                    <TextInput
                        name="qualification"
                        label="Qualification/Degree"
                        value={qualification}
                        onChange={setQualification}
                        required
                        placeholder="e.g., Bachelor of Science in Computer Science"
                    />
                    <TextInput
                        name="place"
                        label="Institution"
                        value={place}
                        onChange={setPlace}
                        required
                        placeholder="e.g., University of Example"
                    />
                    <TextInput
                        name="startYear"
                        label="Start Year"
                        value={startYear}
                        onChange={setStartYear}
                        required
                        placeholder="e.g., 2017"
                    />
                    <TextInput
                        name="endYear"
                        label="End Year"
                        value={endYear}
                        onChange={setEndYear}
                        required
                        placeholder="e.g., 2021 or 'ongoing'"
                    />
                    <RequiredFieldsText>
                        <RequiredAsterisk>*</RequiredAsterisk> Required fields
                    </RequiredFieldsText>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                    <ButtonContainer>
                        <Button
                            label="Update"
                            size={ButtonSize.bigFullWidth}
                            type={ButtonType.constructive}
                            action={handleUpdateEducation}
                        />
                        <Button
                            label="Cancel"
                            size={ButtonSize.bigFullWidth}
                            action={handleCancel}
                        />
                    </ButtonContainer>
                </StyledForm>
            </PopupContent>
        </Popup>
    );
};

export default EditEducationPopup;