import React, {useState} from "react";
import Popup, {PopupProps} from "../Popup";
import Experience from "../../../../data/experience";
import Button, {ButtonType} from "../../../atoms/buttons and links/Button";
import Spacer from "../../../atoms/utilities/Spacer";
import database from "../../../../data/database";
import {
    PopupContent,
    ExperiencesList,
    ExperienceItem,
    ExperienceCheckbox,
    ExperienceTitle,
    ErrorMessage,
    ButtonContainer
} from "./RemoveExperiencesPopup.styled";

export interface RemoveExperiencesPopupProps extends PopupProps {
    experiences: Experience[],
    onClose: (experiencesAfterDelete: Experience[]) => void;
}

const RemoveExperiencesPopup: React.FC<RemoveExperiencesPopupProps> = ({ isPopupShown, experiences, onClose }) => {
    const [selectedExperienceIds, setSelectedExperienceIds] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleRemove = () => {
        const userIsSure = window.confirm("Are you sure you want to delete selected experiences? You cannot undo that!");

        if (userIsSure) {
            database.experiences
                .deleteMany(selectedExperienceIds)
                .then(() => {
                    onClose(experiences.filter(experience => experience.id && !selectedExperienceIds.includes(experience.id)));
                }).catch(error => {
                   setErrorMessage(error.message);
                });
        }
    };

    const handleSelect = (experience: Experience, event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const isChecked = event.target.checked;

        if (!experience.id) {
            return;
        }

        if (isChecked) {
           if (!selectedExperienceIds.includes(experience.id)) {
               setSelectedExperienceIds([...selectedExperienceIds, experience.id])
           }
        } else {
            setSelectedExperienceIds(selectedExperienceIds.filter(id => id !== experience.id));
        }
    };

    return (
        <Popup isPopupShown={isPopupShown}>
            <Spacer />
            <PopupContent>
                <ExperiencesList>
                    {
                        experiences.map(experience => {
                            return (
                                <ExperienceItem key={experience.id}>
                                    <ExperienceCheckbox 
                                        type="checkbox" 
                                        onChange={e => handleSelect(experience, e)}
                                    />
                                    <ExperienceTitle>{experience.title} ({experience.id})</ExperienceTitle>
                                </ExperienceItem>
                            );
                        })
                    }
                </ExperiencesList>
                <Spacer />
                <ErrorMessage>{errorMessage}</ErrorMessage>
                <ButtonContainer>
                    <Button label="Remove selected" type={ButtonType.destructive} action={handleRemove}/>
                    <Button label="Cancel" action={() => onClose(experiences)}/>
                </ButtonContainer>
            </PopupContent>
            <Spacer />
        </Popup>
    );
};

export default RemoveExperiencesPopup;