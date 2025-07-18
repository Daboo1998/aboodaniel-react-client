import React, { useState, useRef, useEffect, useCallback } from "react";
import Popup, { PopupProps } from "../Popup";
import Button, { ButtonSize, ButtonType } from "../../../atoms/buttons and links/Button";
import database from "../../../../data/database";
import EducationItem from "../../../../data/EducationItem";
import {
    PopupContent,
    PopupTitle,
    StyledForm,
    ErrorMessage,
    ButtonContainer,
    CloseButton
} from "../experience/AddExperiencePopup.styled";
import styled from "styled-components";

const EducationList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
    max-height: 300px;
    overflow-y: auto;
`;

const EducationItemContainer = styled.div`
    display: flex;
    align-items: center;
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
`;

const EducationInfo = styled.div`
    flex: 1;
    color: white;
`;

const EducationTitle = styled.div`
    font-weight: 600;
`;

const EducationDetails = styled.div`
    font-size: 0.875rem;
    opacity: 0.8;
`;

export interface RemoveEducationPopupProps extends PopupProps {
    educationItems: EducationItem[];
    onClose: (deletedIds?: string[]) => void;
}

const RemoveEducationPopup: React.FC<RemoveEducationPopupProps> = (props) => {
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

    const handleRemoveEducation = () => {
        if (selectedIds.size === 0) {
            setErrorMessage("Please select at least one education item to remove.");
            return;
        }

        const idsToDelete = Array.from(selectedIds);
        
        database.education
            .deleteMany(idsToDelete)
            .then(() => {
                props.onClose(idsToDelete);
            })
            .catch((error) => {
                console.error("Error removing education:", error);
                setErrorMessage("Failed to remove education. Please try again.");
            });
    };

    return (
        <Popup isPopupShown={props.isPopupShown}>
            <PopupContent ref={popupContentRef}>
                <CloseButton onClick={handleCancel} aria-label="Close popup">
                    ×
                </CloseButton>
                <PopupTitle>Remove Education</PopupTitle>
                <StyledForm>
                    <EducationList>
                        {props.educationItems.map((item) => (
                            <EducationItemContainer key={item.id}>
                                <Checkbox
                                    type="checkbox"
                                    checked={selectedIds.has(item.id)}
                                    onChange={() => handleToggleSelection(item.id)}
                                    aria-label={`Select ${item.qualification} at ${item.place}`}
                                />
                                <EducationInfo>
                                    <EducationTitle>{item.qualification}</EducationTitle>
                                    <EducationDetails>
                                        {item.place} ({item.startYear} - {item.endYear})
                                    </EducationDetails>
                                </EducationInfo>
                            </EducationItemContainer>
                        ))}
                    </EducationList>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                    <ButtonContainer>
                        <Button
                            label={`Remove (${selectedIds.size})`}
                            size={ButtonSize.bigFullWidth}
                            type={ButtonType.destructive}
                            action={handleRemoveEducation}
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

export default RemoveEducationPopup;