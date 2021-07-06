import React, {useState} from "react";
import Popup, {PopupProps} from "../Popup";
import Experience from "../../../../data/experience";
import SubmitButton, {SubmitButtonType} from "../../../atoms/buttons and links/SubmitButton";
import Spacer from "../../../atoms/utilities/Spacer";
import database from "../../../../data/database";

export interface RemoveExperiencesPopupProps extends PopupProps {
    experiences: Experience[],
    onClose: (experiencesAfterDelete: Experience[]) => void;
}


const RemoveExperiencesPopup: React.FC<RemoveExperiencesPopupProps> = ({isPopupShown, experiences, onClose}) => {
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
            <div className="flex flex-col space-y-2 bg-white dark:bg-gray-800 p-4 rounded-xl max-h-full">
                <ol className="overflow-y-scroll">
                    {
                        experiences.map(experience => {
                            return (
                                <li key={experience.id} className="flex flex-row space-x-2 items-center">
                                    <input type="checkbox" onChange={e => handleSelect(experience, e)}/>
                                    <p>{experience.title} ({experience.id})</p>
                                </li>
                            );
                        })
                    }
                </ol>
                <p className="text-red-800">{errorMessage}</p>
                <SubmitButton label="Remove selected" type={SubmitButtonType.destructive} onSubmit={handleRemove}/>
                <SubmitButton label="Cancel" onSubmit={() => onClose(experiences)}/>
            </div>
            <Spacer />
        </Popup>
    );
};

export default RemoveExperiencesPopup;