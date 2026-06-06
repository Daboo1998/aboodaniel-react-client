import React, { useState, useCallback, useEffect } from "react";
import Popup, { PopupProps } from "../Popup";
import database from "../../../../data/database";
import EducationItem from "../../../../data/EducationItem";
import { ReactComponent as CloseIcon } from "../../../../images/icons/closeIcon.svg";
import {
    PopupContent,
    HeaderRow,
    HeaderTitle,
    CloseButton,
    ExperiencesList,
    ExperienceItem,
    ExperienceCheckbox,
    ExperienceTitle,
    ErrorMessage,
    ButtonContainer
} from "../experience/RemoveExperiencesPopup.styled";

export interface RemoveEducationPopupProps extends PopupProps {
    educationItems: EducationItem[];
    onClose: (deletedIds?: string[]) => void;
}

const RemoveEducationPopup: React.FC<RemoveEducationPopupProps> = (props) => {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleClose = useCallback(() => {
        setSelectedIds(new Set()); setErrorMessage(undefined); props.onClose();
    }, [props]);

    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape' && props.isPopupShown) handleClose(); };
        document.addEventListener('keydown', onEsc);
        return () => document.removeEventListener('keydown', onEsc);
    }, [props.isPopupShown, handleClose]);

    const toggle = (id: string) => {
        const next = new Set(selectedIds);
        next.has(id) ? next.delete(id) : next.add(id);
        setSelectedIds(next);
    };

    const handleRemove = () => {
        if (selectedIds.size === 0) { setErrorMessage("Select at least one item to remove."); return; }
        const ids = Array.from(selectedIds);
        database.education.deleteMany(ids)
            .then(() => props.onClose(ids))
            .catch(() => setErrorMessage("Failed to remove education. Please try again."));
    };

    return (
        <Popup isPopupShown={props.isPopupShown}>
            <PopupContent>
                <HeaderRow>
                    <CloseButton onClick={handleClose} aria-label="Close">
                        <CloseIcon />
                    </CloseButton>
                    <HeaderTitle>Remove Education</HeaderTitle>
                </HeaderRow>
                <ExperiencesList>
                    {props.educationItems.map(item => (
                        <ExperienceItem key={item.id} onClick={() => toggle(item.id)}>
                            <ExperienceCheckbox
                                type="checkbox"
                                checked={selectedIds.has(item.id)}
                                onChange={() => toggle(item.id)}
                                onClick={e => e.stopPropagation()}
                            />
                            <ExperienceTitle>{item.qualification} — {item.place} ({item.startYear}–{item.endYear})</ExperienceTitle>
                        </ExperienceItem>
                    ))}
                </ExperiencesList>
                <ErrorMessage>{errorMessage}</ErrorMessage>
                <ButtonContainer>
                    <button
                        className="btn btn-primary"
                        style={{ background: 'oklch(0.6 0.2 25 / 0.08)', borderColor: 'oklch(0.6 0.2 25 / 0.22)', color: 'oklch(0.62 0.2 25)' }}
                        onClick={handleRemove}
                        disabled={selectedIds.size === 0}
                    >
                        Remove ({selectedIds.size})
                    </button>
                    <button className="btn btn-ghost" onClick={handleClose}>Cancel</button>
                </ButtonContainer>
            </PopupContent>
        </Popup>
    );
};

export default RemoveEducationPopup;
