import React, { useState, useCallback } from "react";
import Popup, { PopupProps } from "../Popup";
import TextInput from "../../../atoms/input/TextInput";
import TextAreaInput from "../../../atoms/input/TextAreaInput";
import database from "../../../../data/database";
import SkillSet from "../../../../data/SkillSet";
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as CloseIcon } from "../../../../images/icons/closeIcon.svg";
import { PopupContent, HeaderRow, HeaderTitle, CloseButton, ErrorMessage, PopupFooter } from "../shared.styled";
import { StyledForm, FormBody, RequiredNote } from "../experience/AddExperiencePopup.styled";

export interface AddSkillSetPopupProps extends PopupProps {
    onClose: (addedSkillSet?: SkillSet) => void;
}

const AddSkillSetPopup: React.FC<AddSkillSetPopupProps> = (props) => {
    const [name, setName] = useState("");
    const [skills, setSkills] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const { onClose } = props;
    const handleClose = useCallback(() => {
        setName(""); setSkills(""); setErrorMessage(undefined); onClose();
    }, [onClose]);

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        if (!name || !skills.trim()) { setErrorMessage("Please fill all required fields."); return; }

        const skillsArray = skills.split(/[,\n]/).map(s => s.trim()).filter(s => s.length > 0);
        if (skillsArray.length === 0) { setErrorMessage("Please enter at least one skill."); return; }

        const newSkillSet: SkillSet = { id: uuidv4(), name, skills: skillsArray };

        database.skillSets.post(newSkillSet)
            .then(() => {
                onClose(newSkillSet);
                setName(""); setSkills(""); setErrorMessage(undefined);
            })
            .catch(() => setErrorMessage("Failed to add skill set. Please try again."));
    };

    return (
        <Popup isPopupShown={props.isPopupShown} onDismiss={handleClose}>
            <PopupContent>
                <HeaderRow>
                    <CloseButton onClick={handleClose} aria-label="Close">
                        <CloseIcon />
                    </CloseButton>
                    <HeaderTitle>Add Skill Set</HeaderTitle>
                </HeaderRow>
                <StyledForm onSubmit={handleSubmit}>
                    <FormBody>
                        <TextInput name="name" label="Skill Set Name" value={name} onChange={setName} required placeholder="e.g., Programming Languages" />
                        <TextAreaInput name="skills" label="Skills" value={skills} onChange={setSkills} required placeholder="Enter skills separated by commas or new lines" rows={5} />
                        <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-3)' }}>Separate skills by commas or new lines. Example: React, TypeScript, Node.js</p>
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

export default AddSkillSetPopup;
