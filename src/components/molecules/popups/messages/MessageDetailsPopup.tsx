import React from "react";
import Popup, { PopupProps } from "../Popup";
import Message from "../../../../data/Message";
import database, { timestampToString } from "../../../../data/database";
import { ReactComponent as CloseIcon } from "../../../../images/icons/closeIcon.svg";
import { ReactComponent as TrashIcon } from "../../../../images/icons/trash.svg";
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
        if (userIsSure && message?.id) {
            database.messages
                .delete(message.id)
                .then(() => {
                    onMessageDelete?.(message);
                    onClose();
                })
                .catch(error => alert(error.message));
        }
    };

    const handleReplyClick = () => {
        if (message) {
            window.open(`mailto:${message.email}?subject=Re:%20${message.subject}`);
        }
    };

    return (
        <Popup isPopupShown={isPopupShown} onDismiss={onClose}>
            {message && (
                <PopupContent>
                    <HeaderRow>
                        <CloseButton onClick={onClose} aria-label="Close">
                            <CloseIcon />
                        </CloseButton>
                        <span style={{ flex: 1 }} />
                        <DeleteButton onClick={handleMessageDelete} aria-label="Delete message">
                            <TrashIcon />
                            Delete
                        </DeleteButton>
                    </HeaderRow>
                    <MessageDetails>
                        <MessageHeader>
                            <MessageSubject>{message.subject}</MessageSubject>
                            <MessageTimestamp>{timestampToString(message.timestamp, true)}</MessageTimestamp>
                        </MessageHeader>
                        <MessageInfo>From: <MessageInfoHighlight>{message.name}</MessageInfoHighlight></MessageInfo>
                        <MessageInfo>Email: <MessageInfoHighlight>{message.email}</MessageInfoHighlight></MessageInfo>
                    </MessageDetails>
                    <MessageContent>{message.message}</MessageContent>
                    <ReplyButton>
                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', justifyContent: 'center' }}
                            onClick={handleReplyClick}
                        >
                            Reply <span className="arrow">→</span>
                        </button>
                    </ReplyButton>
                </PopupContent>
            )}
        </Popup>
    );
};

export default MessageDetailsPopup;
