import React from "react";
import Spacer from "../utilities/Spacer";
import {timestampToString} from "../../../data/database";
import Message from "../../../data/Message";
import {
    MessageContainer,
    MessageHeader,
    MessageName,
    MessageTimestamp,
    MessageSubject,
    MessagePreview
} from "./MessageComponent.styled";

export interface MessageComponentProps {
    message: Message;
    onMessageClick: (e: React.MouseEvent<HTMLDivElement>, message: Message) => void;
}

const MessageComponent: React.FC<MessageComponentProps> = ({message, onMessageClick}) => (
    <MessageContainer onClick={e => onMessageClick(e, message)}>
        <MessageHeader>
            <MessageName>{message.name}</MessageName>
            <Spacer />
            <MessageTimestamp>{timestampToString(message.timestamp)}</MessageTimestamp>
        </MessageHeader>
        <MessageSubject>{message.subject}</MessageSubject>
        <MessagePreview>{message.message}</MessagePreview>
    </MessageContainer>
);

export default MessageComponent;
