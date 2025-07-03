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
import styled from "styled-components";

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
            <ContentWrapper>
                <h2>Add Experience</h2>
                <form>
                    <NumberInput min={0} max={1000} name="importance" label="Importance [0-1000] (default 0)" value={importance} onChange={setImportance} required/>
                    <TextInput name="title" label="Title" required onChange={setTitle} />
                    <Row>
                        <LabelText>Is ongoing</LabelText>
                        <input type="checkbox" name="ongoing" onChange={e => setIsOngoing(e.target.checked)} />
                    </Row>
                    <Row>
                        <DateInput label="Start date" required name="startDate" onChange={setStartDate} />
                        {
                            !isOngoing ? <DateInput label="End date" name="endDate" onChange={setEndDate} required/> :
                                <Spacer />
                        }
                    </Row>
                    <TextAreaInput name="description" label="Description" onChange={setDescription} required />
                    <TextInput name="link" label="Link (optional)" onChange={setLink}/>
                    <TextInput name="linkText" label="Link text (optional)" onChange={setLinkText} />
                    <RequiredText><span>*</span> Required fields</RequiredText>
                    {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
                    <Button label="Add" size={ButtonSize.bigFullWidth} type={ButtonType.constructive} action={e => handleAddExperience(e)} />
                    <Button label="Cancel" size={ButtonSize.bigFullWidth} action={handleCancel} />
                </form>
            </ContentWrapper>
            <Spacer />
        </Popup>
    );
};

export default AddExperiencePopup;

// -------------------- styled components --------------------

const ContentWrapper = styled.div`
  background: #ffffff;
  padding: 1rem; /* p-4 */
  border-radius: 0.75rem; /* rounded-xl */
  width: 100%;
  overflow-y: auto;

  @media (prefers-color-scheme: dark) {
    background: #1f2937; /* gray-800 */
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
`;

const LabelText = styled.p`
  padding-right: 1rem; /* pr-4 */
`;

const RequiredText = styled.p`
  width: 100%;
  span {
    color: #dc2626; /* red-600 */
  }
`;

const ErrorText = styled.p`
  color: #dc2626;
`;