import React, { useState, useCallback, useEffect } from "react";
import Popup, { PopupProps } from "../Popup";
import TextInput from "../../../atoms/input/TextInput";
import TextAreaInput from "../../../atoms/input/TextAreaInput";
import database from "../../../../data/database";
import SkillSet from "../../../../data/SkillSet";
import { ReactComponent as CloseIcon } from "../../../../images/icons/closeIcon.svg";
import {
    PopupContent,
    HeaderRow,
    HeaderTitle,
    CloseButton,
    StyledForm,
    FormBody,
    RequiredNote,
    ErrorMessage,
    FormFooter
} from "../experience/AddExperiencePopup.styled";

export interface EditSkillSetPopupProps extends PopupProps {
    skillSet: SkillSet | null;
    onClose: (updatedSkillSet?: SkillSet) => void;
}

const EditSkillSetPopup: React.FC<EditSkillSetPopupProps> = (props) => {
    const [name, setName] = useState("");
    const [skills, setSkills] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (props.skillSet) {
            setName(props.skillSet.name || "");
            setSkills(props.skillSet.skills.join(", ") || "");
            setErrorMessage(undefined);
        }
    }, [props.skillSet]);

    const handleClose = useCallback(() => { props.onClose(); }, [props]);

    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape' && props.isPopupShown) handleClose(); };
        document.addEventListener('keydown', onEsc);
        return () => document.removeEventListener('keydown', onEsc);
    }, [props.isPopupShown, handleClose]);

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        if (!props.skillSet) { setErrorMessage("No skill set selected."); return; }
        if (!name || !skills.trim()) { setErrorMessage("Please fill all required fields."); return; }

        const skillsArray = skills.split(/[,\n]/).map(s => s.trim()).filter(s => s.length > 0);
        if (skillsArray.length === 0) { setErrorMessage("Please enter at least one skill."); return; }

        const updatedSkillSet: SkillSet = { id: props.skillSet.id, name, skills: skillsArray };

        database.skillSets.post(updatedSkillSet)
            .then(() => props.onClose(updatedSkillSet))
            .catch(() => setErrorMessage("Failed to update skill set. Please try again."));
    };

    return (
        <Popup isPopupShown={props.isPopupShown}>
            <PopupContent>
                <HeaderRow>
                    <CloseButton onClick={handleClose} aria-label="Close">
                        <CloseIcon />
                    </CloseButton>
                    <HeaderTitle>Edit Skill Set</HeaderTitle>
                </HeaderRow>
                <StyledForm onSubmit={handleSubmit}>
                    <FormBody>
                        <TextInput name="name" label="Skill Set Name" value={name} onChange={setName} required placeholder="e.g., Programming Languages" />
                        <TextAreaInput name="skills" label="Skills" value={skills} onChange={setSkills} required placeholder="Enter skills separated by commas or new lines" rows={5} />
                        <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-3)' }}>Enter each skill separated by commas or on a new line. Example: React, TypeScript, Node.js</p>
                        <RequiredNote><span style={{ color: 'oklch(0.62 0.2 25)' }}>*</span> Required fields</RequiredNote>
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    </FormBody>
                    <FormFooter>
                        <button className="btn btn-primary" type="submit">Update <span className="arrow">→</span></button>
                        <button className="btn btn-ghost" type="button" onClick={handleClose}>Cancel</button>
                    </FormFooter>
                </StyledForm>
            </PopupContent>
        </Popup>
    );
};

export default EditSkillSetPopup;
