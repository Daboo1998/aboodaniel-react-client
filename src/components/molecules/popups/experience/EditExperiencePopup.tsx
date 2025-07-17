import React, {useState, useEffect, useRef, useCallback} from "react";
import Popup, {PopupProps} from "../Popup";
import TextInput from "../../../atoms/input/TextInput";
import TextAreaInput from "../../../atoms/input/TextAreaInput";
import NumberInput from "../../../atoms/input/NumberInput";
import Spacer from "../../../atoms/utilities/Spacer";
import DateInput from "../../../atoms/input/DateInput";
import Button, {ButtonSize, ButtonType} from "../../../atoms/buttons and links/Button";
import database, {Timestamp} from "../../../../data/database";
import Experience from "../../../../data/experience";
import {
    PopupContent,
    PopupTitle,
    StyledForm,
    OngoingContainer,
    OngoingLabel,
    OngoingCheckbox,
    DateInputsContainer,
    DateInputSpacer,
    RequiredFieldsText,
    RequiredAsterisk,
    ErrorMessage,
    ButtonContainer,
    CloseButton
} from "./AddExperiencePopup.styled";

export interface EditExperiencePopupProps extends PopupProps {
    experience: Experience | null;
    onClose: (updatedExperience?: Experience) => void;
}

const EditExperiencePopup: React.FC<EditExperiencePopupProps> = (props) => {
    const [title, setTitle] = useState("");
    const [importance, setImportance] = useState(0);
    const [isOngoing, setIsOngoing] = useState(false);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [linkText, setLinkText] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const popupContentRef = useRef<HTMLDivElement>(null);

    // Pre-populate form when experience prop changes
    useEffect(() => {
        if (props.experience) {
            setTitle(props.experience.title || "");
            setImportance(props.experience.importance || 0);
            setIsOngoing(props.experience.endDate === "ongoing");
            
            // Format start date
            if (props.experience.startingDate) {
                const startDate = props.experience.startingDate.toDate();
                setStartDate(startDate.toISOString().split('T')[0]);
            }
            
            // Format end date
            if (props.experience.endDate && props.experience.endDate !== "ongoing") {
                const endDate = props.experience.endDate.toDate();
                setEndDate(endDate.toISOString().split('T')[0]);
            } else {
                setEndDate("");
            }
            
            setDescription(props.experience.description || "");
            setLink(props.experience.link || "");
            setLinkText(props.experience.linkText || "");
            setErrorMessage(undefined);
        }
    }, [props.experience]);

    const handleCancel = useCallback(() => {
        // Reset form
        setTitle("");
        setImportance(0);
        setIsOngoing(false);
        setStartDate("");
        setEndDate("");
        setDescription("");
        setLink("");
        setLinkText("");
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
            // Add a small delay to prevent immediate closing
            setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside);
            }, 100);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [props.isPopupShown, handleCancel]);

    const handleUpdateExperience: React.MouseEventHandler = (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        if (!props.experience) {
            setErrorMessage("No experience to update");
            return;
        }

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
            setErrorMessage("Description is required");
            return;
        }

        if (importance < 0 || importance > 1000) {
            setErrorMessage("Importance range is 0-1000");
            return;
        }

        const updatedExperience: Experience = {
            ...props.experience,
            importance,
            title,
            startingDate: Timestamp.fromDate(new Date(Date.parse(startDate))),
            endDate: isOngoing ? "ongoing" : Timestamp.fromDate(new Date(Date.parse(endDate))),
            description,
            link,
            linkText
        };

        database.experiences.post(updatedExperience).then(() => {
            props.onClose(updatedExperience);
        }).catch(error => {
            setErrorMessage(error.message);
        });
    };

    return (
        <Popup isPopupShown={props.isPopupShown}>
            <PopupContent ref={popupContentRef}>
                <CloseButton onClick={handleCancel} aria-label="Close popup">
                    ×
                </CloseButton>
                <PopupTitle>Edit Experience</PopupTitle>
                <StyledForm>
                    <NumberInput 
                        min={0} 
                        max={1000} 
                        name="importance" 
                        label="Importance [0-1000]" 
                        value={importance} 
                        onChange={setImportance} 
                        required 
                    />
                    <TextInput 
                        name="title" 
                        label="Title" 
                        value={title}
                        required 
                        onChange={setTitle} 
                    />
                    <OngoingContainer>
                        <OngoingLabel>Is ongoing</OngoingLabel>
                        <OngoingCheckbox 
                            type="checkbox" 
                            name="ongoing" 
                            checked={isOngoing}
                            onChange={e => setIsOngoing(e.target.checked)} 
                        />
                        <Spacer />
                    </OngoingContainer>
                    <DateInputsContainer>
                        <DateInput 
                            label="Start date" 
                            required 
                            name="startDate" 
                            value={startDate}
                            onChange={setStartDate} 
                        />
                        {
                            !isOngoing ? 
                                <DateInput 
                                    label="End date" 
                                    name="endDate" 
                                    value={endDate}
                                    onChange={setEndDate} 
                                    required 
                                /> :
                                <DateInputSpacer />
                        }
                    </DateInputsContainer>
                    <TextAreaInput 
                        name="description" 
                        label="Description" 
                        value={description}
                        onChange={setDescription} 
                        required 
                    />
                    <TextInput 
                        name="link" 
                        label="Link (optional)" 
                        value={link}
                        onChange={setLink} 
                    />
                    <TextInput 
                        name="linkText" 
                        label="Link text (optional)" 
                        value={linkText}
                        onChange={setLinkText} 
                    />
                    <RequiredFieldsText><RequiredAsterisk>*</RequiredAsterisk> Required fields</RequiredFieldsText>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                    <ButtonContainer>
                        <Button 
                            label="Update" 
                            size={ButtonSize.bigFullWidth} 
                            type={ButtonType.constructive} 
                            action={e => handleUpdateExperience(e)} 
                        />
                        <Button 
                            label="Cancel" 
                            size={ButtonSize.bigFullWidth} 
                            action={handleCancel} 
                        />
                    </ButtonContainer>
                </StyledForm>
            </PopupContent>
            <Spacer />
        </Popup>
    );
};

export default EditExperiencePopup;