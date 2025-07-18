import React, { useState, useRef, useEffect, useCallback } from "react";
import Popup, { PopupProps } from "../Popup";
import TextInput from "../../../atoms/input/TextInput";
import TextAreaInput from "../../../atoms/input/TextAreaInput";
import Button, { ButtonSize, ButtonType } from "../../../atoms/buttons and links/Button";
import database from "../../../../data/database";
import SkillSet from "../../../../data/SkillSet";
import { generateId } from "../../../../utils/accessibility";
import styled from "styled-components";
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

const SkillsHelpText = styled.p`
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
    margin-top: -8px;
    margin-bottom: 16px;
`;

export interface AddSkillSetPopupProps extends PopupProps {
    onClose: (addedSkillSet?: SkillSet) => void;
}

const AddSkillSetPopup: React.FC<AddSkillSetPopupProps> = (props) => {
    const [name, setName] = useState("");
    const [skills, setSkills] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const popupContentRef = useRef<HTMLDivElement>(null);

    const handleCancel = useCallback(() => {
        // Reset form
        setName("");
        setSkills("");
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

    const handleAddSkillSet: React.MouseEventHandler = (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        // Validate
        if (!name || !skills.trim()) {
            setErrorMessage("Please fill all required fields.");
            return;
        }

        // Parse skills (split by commas or new lines)
        const skillsArray = skills
            .split(/[,\n]/)
            .map(skill => skill.trim())
            .filter(skill => skill.length > 0);

        if (skillsArray.length === 0) {
            setErrorMessage("Please enter at least one skill.");
            return;
        }

        const newSkillSet: SkillSet = {
            id: generateId('skillset'),
            name,
            skills: skillsArray
        };

        database.skillSets
            .post(newSkillSet)
            .then(() => {
                // Reset form
                setName("");
                setSkills("");
                setErrorMessage(undefined);
                props.onClose(newSkillSet);
            })
            .catch((error) => {
                console.error("Error adding skill set:", error);
                setErrorMessage("Failed to add skill set. Please try again.");
            });
    };

    return (
        <Popup isPopupShown={props.isPopupShown}>
            <PopupContent ref={popupContentRef}>
                <CloseButton onClick={handleCancel} aria-label="Close popup">
                    ×
                </CloseButton>
                <PopupTitle>Add Skill Set</PopupTitle>
                <StyledForm>
                    <TextInput
                        name="name"
                        label="Skill Set Name"
                        value={name}
                        onChange={setName}
                        required
                        placeholder="e.g., Programming Languages, Frameworks, Tools"
                    />
                    <TextAreaInput
                        name="skills"
                        label="Skills"
                        value={skills}
                        onChange={setSkills}
                        required
                        placeholder="Enter skills separated by commas or new lines"
                        rows={6}
                    />
                    <SkillsHelpText>
                        Enter each skill separated by commas or on a new line.
                        Example: React, TypeScript, Node.js
                    </SkillsHelpText>
                    <RequiredFieldsText>
                        <RequiredAsterisk>*</RequiredAsterisk> Required fields
                    </RequiredFieldsText>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                    <ButtonContainer>
                        <Button
                            label="Add"
                            size={ButtonSize.bigFullWidth}
                            type={ButtonType.constructive}
                            action={handleAddSkillSet}
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

export default AddSkillSetPopup;