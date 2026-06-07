import React, { useState, useCallback, useEffect } from "react";
import Popup, { PopupProps } from "../Popup";
import database from "../../../../data/database";
import EducationItem from "../../../../data/EducationItem";
import { ReactComponent as CloseIcon } from "../../../../images/icons/closeIcon.svg";
import { PopupContent, HeaderRow, HeaderTitle, CloseButton, SelectList, SelectItem, SelectCheckbox, SelectLabel, PopupFooter, DangerButton } from "../shared.styled";
import { ErrorMessage } from "../experience/RemoveExperiencesPopup.styled";

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
                <SelectList>
                    {props.educationItems.map(item => (
                        <SelectItem key={item.id} onClick={() => toggle(item.id)}>
                            <SelectCheckbox
                                type="checkbox"
                                checked={selectedIds.has(item.id)}
                                onChange={() => toggle(item.id)}
                                onClick={e => e.stopPropagation()}
                            />
                            <SelectLabel>{item.qualification} — {item.place} ({item.startYear}–{item.endYear})</SelectLabel>
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

export default RemoveEducationPopup;
