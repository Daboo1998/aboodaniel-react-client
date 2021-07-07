import React from "react";
import Spacer from "../utilities/Spacer";
import {timestampToString} from "../../../data/database";
import Message from "../../../data/Message";

export interface MessageComponentProps {
    message: Message;
    onMessageClick: (e: React.MouseEvent<HTMLDivElement>, message: Message) => void;
}

const MessageComponent: React.FC<MessageComponentProps> = ({message, onMessageClick}) => (
    <div className="pb-2 border-b border-black dark:border-white" onClick={e => onMessageClick(e, message)}>
        <div className="flex flex-row">
            <h4>{message.name}</h4>
            <Spacer />
            <p className="flex-shrink-0">{timestampToString(message.timestamp)}</p>
        </div>
        <h5>{message.subject}</h5>
        <p className="line-clamp-3 whitespace-pre-wrap">{message.message}</p>
    </div>
);

export default MessageComponent;
