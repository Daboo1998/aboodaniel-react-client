import React, { useState, useRef, useEffect, useCallback } from "react";
import Popup, { PopupProps } from "../Popup";
import Button, { ButtonSize, ButtonType } from "../../../atoms/buttons and links/Button";
import database from "../../../../data/database";
import SkillSet from "../../../../data/SkillSet";
import {
    PopupContent,
    PopupTitle,
    StyledForm,
    ErrorMessage,
    ButtonContainer,
    CloseButton
} from "../experience/AddExperiencePopup.styled";
import styled from "styled-components";

const SkillSetList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
    max-height: 300px;
    overflow-y: auto;
`;

const SkillSetItemContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Checkbox = styled.input`
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-top: 2px;
`;

const SkillSetInfo = styled.div`
    flex: 1;
    color: white;
`;

const SkillSetName = styled.div`
    font-weight: 600;
    margin-bottom: 4px;
`;

const SkillsPreview = styled.div`
    font-size: 0.875rem;
    opacity: 0.8;
    line-height: 1.4;
`;

export interface RemoveSkillSetPopupProps extends PopupProps {
    skillSets: SkillSet[];
    onClose: (deletedIds?: string[]) => void;
}

const RemoveSkillSetPopup: React.FC<RemoveSkillSetPopupProps> = (props) => {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const popupContentRef = useRef<HTMLDivElement>(null);

    const handleCancel = useCallback(() => {
        setSelectedIds(new Set());
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

    const handleToggleSelection = (id: string) => {
        const newSelection = new Set(selectedIds);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedIds(newSelection);
    };

    const handleRemoveSkillSets = () => {
        if (selectedIds.size === 0) {
            setErrorMessage("Please select at least one skill set to remove.");
            return;
        }

        const idsToDelete = Array.from(selectedIds);
        
        database.skillSets
            .deleteMany(idsToDelete)
            .then(() => {
                props.onClose(idsToDelete);
            })
            .catch((error) => {
                console.error("Error removing skill sets:", error);
                setErrorMessage("Failed to remove skill sets. Please try again.");
            });
    };

    const getSkillsPreview = (skills: string[]) => {
        const maxSkills = 3;
        const displaySkills = skills.slice(0, maxSkills);
        const remainingCount = skills.length - maxSkills;
        
        let preview = displaySkills.join(", ");
        if (remainingCount > 0) {
            preview += ` +${remainingCount} more`;
        }
        return preview;
    };

    return (
        <Popup isPopupShown={props.isPopupShown}>
            <PopupContent ref={popupContentRef}>
                <CloseButton onClick={handleCancel} aria-label="Close popup">
                    ×
                </CloseButton>
                <PopupTitle>Remove Skill Sets</PopupTitle>
                <StyledForm>
                    <SkillSetList>
                        {props.skillSets.map((skillSet) => (
                            <SkillSetItemContainer key={skillSet.id}>
                                <Checkbox
                                    type="checkbox"
                                    checked={selectedIds.has(skillSet.id)}
                                    onChange={() => handleToggleSelection(skillSet.id)}
                                    aria-label={`Select ${skillSet.name}`}
                                />
                                <SkillSetInfo>
                                    <SkillSetName>{skillSet.name}</SkillSetName>
                                    <SkillsPreview>
                                        {getSkillsPreview(skillSet.skills)}
                                    </SkillsPreview>
                                </SkillSetInfo>
                            </SkillSetItemContainer>
                        ))}
                    </SkillSetList>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                    <ButtonContainer>
                        <Button
                            label={`Remove (${selectedIds.size})`}
                            size={ButtonSize.bigFullWidth}
                            type={ButtonType.destructive}
                            action={handleRemoveSkillSets}
                            disabled={selectedIds.size === 0}
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

export default RemoveSkillSetPopup;