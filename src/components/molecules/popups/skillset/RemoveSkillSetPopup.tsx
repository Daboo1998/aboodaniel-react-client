import React, { useState, useCallback } from "react";
import Popup, { PopupProps } from "../Popup";
import database from "../../../../data/database";
import SkillSet from "../../../../data/SkillSet";
import { ReactComponent as CloseIcon } from "../../../../images/icons/closeIcon.svg";
import { PopupContent, HeaderRow, HeaderTitle, CloseButton, SelectList, SelectItem, SelectCheckbox, SelectLabel, PopupFooter, DangerButton } from "../shared.styled";
import { ErrorMessage } from "../experience/RemoveExperiencesPopup.styled";

export interface RemoveSkillSetPopupProps extends PopupProps {
    skillSets: SkillSet[];
    onClose: (deletedIds?: string[]) => void;
}

const RemoveSkillSetPopup: React.FC<RemoveSkillSetPopupProps> = (props) => {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleClose = useCallback(() => {
        setSelectedIds(new Set()); setErrorMessage(undefined); props.onClose();
    }, [props]);

    const toggle = (id: string) => {
        const next = new Set(selectedIds);
        next.has(id) ? next.delete(id) : next.add(id);
        setSelectedIds(next);
    };

    const handleRemove = () => {
        if (selectedIds.size === 0) { setErrorMessage("Select at least one skill set to remove."); return; }
        const ids = Array.from(selectedIds);
        database.skillSets.deleteMany(ids)
            .then(() => props.onClose(ids))
            .catch(() => setErrorMessage("Failed to remove skill sets. Please try again."));
    };

    const getSkillsPreview = (skills: string[]) => {
        const preview = skills.slice(0, 3).join(", ");
        return skills.length > 3 ? `${preview} +${skills.length - 3} more` : preview;
    };

    return (
        <Popup isPopupShown={props.isPopupShown} onDismiss={handleClose}>
            <PopupContent>
                <HeaderRow>
                    <CloseButton onClick={handleClose} aria-label="Close">
                        <CloseIcon />
                    </CloseButton>
                    <HeaderTitle>Remove Skill Sets</HeaderTitle>
                </HeaderRow>
                <SelectList>
                    {props.skillSets.map(skillSet => (
                        <SelectItem key={skillSet.id} onClick={() => toggle(skillSet.id)}>
                            <SelectCheckbox
                                type="checkbox"
                                checked={selectedIds.has(skillSet.id)}
                                onChange={() => toggle(skillSet.id)}
                                onClick={e => e.stopPropagation()}
                            />
                            <div style={{ minWidth: 0 }}>
                                <SelectLabel>{skillSet.name}</SelectLabel>
                                <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{getSkillsPreview(skillSet.skills)}</p>
                            </div>
                        </SelectItem>
                    ))}
                </SelectList>
                <ErrorMessage>{errorMessage}</ErrorMessage>
                <PopupFooter>
                    <DangerButton onClick={handleRemove} disabled={selectedIds.size === 0}>
                        Remove ({selectedIds.size})
                    </DangerButton>
                    <button className="btn btn-ghost" onClick={handleClose}>Cancel</button>
                </PopupFooter>
            </PopupContent>
        </Popup>
    );
};

export default RemoveSkillSetPopup;
