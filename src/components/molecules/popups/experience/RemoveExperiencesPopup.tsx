import React, { useState } from "react";
import Popup, { PopupProps } from "../Popup";
import Experience from "../../../../data/experience";
import database from "../../../../data/database";
import { ReactComponent as CloseIcon } from "../../../../images/icons/closeIcon.svg";
import { PopupContent, HeaderRow, HeaderTitle, CloseButton, SelectList, SelectItem, SelectCheckbox, SelectLabel, PopupFooter, DangerButton } from "../shared.styled";
import { ErrorMessage } from "./RemoveExperiencesPopup.styled";

export interface RemoveExperiencesPopupProps extends PopupProps {
    experiences: Experience[],
    onClose: (experiencesAfterDelete: Experience[]) => void;
}

const RemoveExperiencesPopup: React.FC<RemoveExperiencesPopupProps> = ({ isPopupShown, experiences, onClose }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleClose = () => onClose(experiences);

    const toggleSelect = (experience: Experience) => {
        if (!experience.id) return;
        setSelectedIds(prev =>
            prev.includes(experience.id!)
                ? prev.filter(id => id !== experience.id)
                : [...prev, experience.id!]
        );
    };

    const handleRemove = () => {
        if (selectedIds.length === 0) return;
        const confirmed = window.confirm("Are you sure you want to delete the selected experiences? This cannot be undone.");
        if (!confirmed) return;

        database.experiences
            .deleteMany(selectedIds)
            .then(() => {
                onClose(experiences.filter(e => e.id && !selectedIds.includes(e.id)));
            })
            .catch(error => setErrorMessage(error.message));
    };

    return (
        <Popup isPopupShown={isPopupShown}>
            <PopupContent>
                <HeaderRow>
                    <CloseButton onClick={handleClose} aria-label="Close">
                        <CloseIcon />
                    </CloseButton>
                    <HeaderTitle>Remove Experiences</HeaderTitle>
                </HeaderRow>
                <SelectList>
                    {experiences.map(experience => (
                        <SelectItem key={experience.id} onClick={() => toggleSelect(experience)}>
                            <SelectCheckbox
                                type="checkbox"
                                checked={!!experience.id && selectedIds.includes(experience.id)}
                                onChange={() => toggleSelect(experience)}
                                onClick={e => e.stopPropagation()}
                            />
                            <SelectLabel>{experience.title}</SelectLabel>
                        </SelectItem>
                    ))}
                </SelectList>
                <ErrorMessage>{errorMessage}</ErrorMessage>
                <PopupFooter>
                    <DangerButton onClick={handleRemove} disabled={selectedIds.length === 0}>
                        Remove selected
                    </DangerButton>
                    <button className="btn btn-ghost" onClick={handleClose}>Cancel</button>
                </PopupFooter>
            </PopupContent>
        </Popup>
    );
};

export default RemoveExperiencesPopup;
