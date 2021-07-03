import React from "react";
import {Popup, PopupProps} from "../../hooks/usePopup";
import Message from "../../data/Message";
import Spacer from "../atoms/Spacer";
import {timestampToString} from "../../data/database";
import { ReactComponent as CloseIcon} from "../../images/icons/closeIcon.svg";

export interface MessageDetailsPopupProps extends PopupProps {
    message: Message | null;
    onClose: () => void;
}

const MessageDetailsPopup: React.FC<MessageDetailsPopupProps> = ({message, isPopupShown, onClose}) => {
    return (
        <Popup isPopupShown={isPopupShown}>
            <Spacer />
            {message && (
                <div className="max-h-full rounded-xl <md:w-screen <md:h-screen p-8 bg-white dark:bg-black overflow-y-scroll">
                    <button onClick={_ => onClose()}><CloseIcon /></button>
                    <div className="border-b border-black dark:border-white p-2">
                        <div className="flex flex-row">
                            <h4 className="flex-shrink-0">{message.subject}</h4>
                            <Spacer />
                            <p className="flex-shrink-0 pl-2">{timestampToString(message.timestamp, true)}</p>
                        </div>
                        <p>Name: <span className="text-gray-600 dark:text-gray-400">{message.name}</span></p>
                        <p>Email: <span className="text-gray-600 dark:text-gray-400">{message.email}</span></p>
                    </div>
                    <p className="max-w-prose p-4 whitespace-pre-wrap">{message.message}</p>
                </div>
            )}
            <Spacer />
        </Popup>
    );
};

export default MessageDetailsPopup;
