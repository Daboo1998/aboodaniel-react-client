import React, { useState, useRef, useEffect, useCallback } from "react";
import Popup, { PopupProps } from "../Popup";
import TextInput from "../../../atoms/input/TextInput";
import TextAreaInput from "../../../atoms/input/TextAreaInput";
import Button, { ButtonSize, ButtonType } from "../../../atoms/buttons and links/Button";
import database from "../../../../data/database";
import SkillSet from "../../../../data/SkillSet";
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

export interface EditSkillSetPopupProps extends PopupProps {
    skillSet: SkillSet | null;
    onClose: (updatedSkillSet?: SkillSet) => void;
}

const EditSkillSetPopup: React.FC<EditSkillSetPopupProps> = (props) => {
    const [name, setName] = useState("");
    const [skills, setSkills] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const popupContentRef = useRef<HTMLDivElement>(null);

    // Pre-populate form when skillSet prop changes
    useEffect(() => {
        if (props.skillSet) {
            setName(props.skillSet.name || "");
            setSkills(props.skillSet.skills.join(", ") || "");
        }
    }, [props.skillSet]);

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

    const handleUpdateSkillSet: React.MouseEventHandler = (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        if (!props.skillSet) {
            setErrorMessage("No skill set selected.");
            return;
        }

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

        const updatedSkillSet: SkillSet = {
            id: props.skillSet.id,
            name,
            skills: skillsArray
        };

        database.skillSets
            .post(updatedSkillSet)
            .then(() => {
                props.onClose(updatedSkillSet);
            })
            .catch((error) => {
                console.error("Error updating skill set:", error);
                setErrorMessage("Failed to update skill set. Please try again.");
            });
    };

    return (
        <Popup isPopupShown={props.isPopupShown}>
            <PopupContent ref={popupContentRef}>
                <CloseButton onClick={handleCancel} aria-label="Close popup">
                    ×
                </CloseButton>
                <PopupTitle>Edit Skill Set</PopupTitle>
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
                            label="Update"
                            size={ButtonSize.bigFullWidth}
                            type={ButtonType.constructive}
                            action={handleUpdateSkillSet}
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

export default EditSkillSetPopup;