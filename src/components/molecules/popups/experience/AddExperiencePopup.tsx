import React, {useState} from "react";
import Popup, {PopupProps} from "../Popup";
import TextInput from "../../../atoms/input/TextInput";
import TextAreaInput from "../../../atoms/input/TextAreaInput";
import NumberInput from "../../../atoms/input/NumberInput";
import Spacer from "../../../atoms/utilities/Spacer";
import DateInput from "../../../atoms/input/DateInput";
import Button, {ButtonSize, ButtonType} from "../../../atoms/buttons and links/Button";
import database, {Timestamp} from "../../../../data/database";
import Experience from "../../../../data/experience";
import {v4 as uuidv4} from 'uuid';

export interface AddExperiencePopupProps extends PopupProps {
    onClose: (addedExperience?: Experience) => void
}

const AddExperiencePopup: React.FC<AddExperiencePopupProps> = (props) => {
    const [title, setTitle] = useState("");
    const [importance, setImportance] = useState(0);
    const [isOngoing, setIsOngoing] = useState(false);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("null");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [linkText, setLinkText] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleCancel: React.MouseEventHandler = (e) => {
        e.preventDefault();
        props.onClose();
    };

    const handleAddExperience: React.MouseEventHandler = (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        if (title.length === 0) {
            setErrorMessage("Title is required");
            return;
        }

        if (startDate.length === 0) {
            setErrorMessage("Start date is required");
            return;
        }

        if (!isOngoing && endDate.length === 0) {
            setErrorMessage("End date is required");
            return;
        }

        if (description.length === 0) {
            setErrorMessage("Start date is required");
            return;
        }

        if (importance < 0 || importance > 1000) {
            setErrorMessage("Importance range is 0-1000");
            return;
        }

        const newExperience: Experience = {
            importance,
            id: uuidv4(),
            title,
            startingDate: Timestamp.fromDate(new Date(Date.parse(startDate))),
            endDate: isOngoing ? "ongoing" : Timestamp.fromDate(new Date(Date.parse(endDate))),
            description,
            link,
            linkText
        };

        database.experiences.post(newExperience).then(() => {
            props.onClose(newExperience);
        }).catch(error => {
            setErrorMessage(error.message);
        })
    };

    return (
        <Popup isPopupShown={props.isPopupShown}>
            <Spacer />
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl <md:w-5/6 overflow-y-scroll">
                <h2>Add Experience</h2>
                <form>
                    <NumberInput min={0} max={1000} name="importance" label="Importance [0-1000] (default 0)" value={importance} onChange={setImportance} required/>
                    <TextInput name="title" label="Title" required onChange={setTitle} />
                    <div className="flex flex-row w-full items-center">
                        <p className="pr-4">Is ongoing</p>
                        <input type="checkbox" name="ongoing" onChange={e => setIsOngoing(e.target.checked)} />
                        <Spacer />
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <DateInput label="Start date" required name="startDate" onChange={setStartDate} />
                        {
                            !isOngoing ? <DateInput label="End date" name="endDate" onChange={setEndDate} required/> :
                                <div className="w-full" />
                        }
                    </div>
                    <TextAreaInput name="description" label="Description" onChange={setDescription} required />
                    <TextInput name="link" label="Link (optional)" onChange={setLink}/>
                    <TextInput name="linkText" label="Link text (optional)" onChange={setLinkText} />
                    <p className="text-red-800">{errorMessage}</p>
                    <Button label="Add" size={ButtonSize.bigFullWidth} type={ButtonType.constructive} action={e => handleAddExperience(e)} />
                    <Button label="Cancel" size={ButtonSize.bigFullWidth} action={handleCancel} />
                </form>
            </div>
            <Spacer />
        </Popup>
    );
};

export default AddExperiencePopup;