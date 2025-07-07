import React from "react";
import Popup, { PopupProps } from "../Popup";
import Message from "../../../../data/Message";
import Spacer from "../../../atoms/utilities/Spacer";
import database, { timestampToString } from "../../../../data/database";
import { ReactComponent as CloseIcon } from "../../../../images/icons/closeIcon.svg";
import { ReactComponent as TrashIcon } from "../../../../images/icons/trash.svg";
import Button, { ButtonType } from "../../../atoms/buttons and links/Button";
import {
    PopupContent,
    HeaderRow,
    CloseButton,
    DeleteButton,
    MessageDetails,
    MessageHeader,
    MessageSubject,
    MessageTimestamp,
    MessageInfo,
    MessageInfoHighlight,
    MessageContent,
    ReplyButton
} from "./MessageDetailsPopup.styled";

export interface MessageDetailsPopupProps extends PopupProps {
    message: Message | null;
    onClose: () => void;
    onMessageDelete?: (message: Message) => void;
}

const MessageDetailsPopup: React.FC<MessageDetailsPopupProps> = ({ message, isPopupShown, onClose, onMessageDelete }) => {
    const handleMessageDelete: React.MouseEventHandler = (event) => {
        event.preventDefault();

        const userIsSure = window.confirm("Are you sure you want to delete the message?");

        if (userIsSure && message && message.id) {
            database.messages
                .delete(message.id)
                .catch(error => {
                    alert(error.message);
                })
                .then(() => {
                    onMessageDelete?.(message);
                    onClose();
                });
        }
    };

    const handleReplyClick = () => {
        if (message) {
            window.open(`mailto:${message.email}?subject=Re:%20${message.subject}`);
        }
    };

    return (
        <Popup isPopupShown={isPopupShown}>
            <Spacer />
            {message && (
                <PopupContent>
                    <HeaderRow>
                        <CloseButton onClick={_ => onClose()}>
                            <CloseIcon />
                        </CloseButton>
                        <Spacer />
                        <DeleteButton onClick={handleMessageDelete}>
                            <TrashIcon />
                        </DeleteButton>
                    </HeaderRow>
                    <MessageDetails>
                        <MessageHeader>
                            <MessageSubject>{message.subject}</MessageSubject>
                            <Spacer />
                            <MessageTimestamp>{timestampToString(message.timestamp, true)}</MessageTimestamp>
                        </MessageHeader>
                        <MessageInfo>Name: <MessageInfoHighlight>{message.name}</MessageInfoHighlight></MessageInfo>
                        <MessageInfo>Email: <MessageInfoHighlight>{message.email}</MessageInfoHighlight></MessageInfo>
                    </MessageDetails>
                    <MessageContent>{message.message}</MessageContent>
                    <ReplyButton>
                        <Button
                            label={"reply"}
                            action={handleReplyClick}
                            type={ButtonType.constructive}
                        />
                    </ReplyButton>
                </PopupContent>
            )}
            <Spacer />
        </Popup>
    );
};

export default MessageDetailsPopup;
