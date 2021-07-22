import React from "react";
import Popup, {PopupProps} from "../Popup";
import Experience from "../../../../data/experience";
import Button, {ButtonType} from "../../../atoms/buttons and links/Button";
import Spacer from "../../../atoms/utilities/Spacer";
import {useRemoveExperiences} from "../../../../hooks/useExperiences";

export interface RemoveExperiencesPopupProps extends PopupProps {
    experiences: Experience[],
    onClose: (experiencesAfterDelete: Experience[]) => void;
}


const RemoveExperiencesPopup: React.FC<RemoveExperiencesPopupProps> = ({isPopupShown, experiences, onClose}) => {
    const {removeSelectedExperiences, toggleExperience, errorMessage} = useRemoveExperiences(onClose);

    const handleRemove = () => {
        const userIsSure = window.confirm("Are you sure you want to delete selected experiences? You cannot undo that!");

        if (userIsSure) {
            removeSelectedExperiences(experiences);
        }
    };

    const handleSelect = (experience: Experience, event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const isChecked = event.target.checked;

        if (!experience.id) {
            return;
        }

        toggleExperience(experience, isChecked);
    };

    return (
        <Popup isPopupShown={isPopupShown}>
            <Spacer />
            <div className="flex flex-col space-y-2 bg-white dark:bg-gray-800 p-4 rounded-xl max-h-full <md:w-full <md:h-full">
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
                <Spacer />
                <p className="text-red-800">{errorMessage}</p>
                <Button className="w-full px-5 py-2" label="Remove selected" type={ButtonType.destructive} action={handleRemove}/>
                <Button className="w-full px-5 py-2" label="Cancel" action={() => onClose(experiences)}/>
            </div>
            <Spacer />
        </Popup>
    );
};

export default RemoveExperiencesPopup;