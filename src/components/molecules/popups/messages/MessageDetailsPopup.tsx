import React from "react";
import Popup, {PopupProps} from "../Popup";
import Message from "../../../../data/Message";
import Spacer from "../../../atoms/utilities/Spacer";
import database, {timestampToString} from "../../../../data/database";
import {ReactComponent as CloseIcon} from "../../../../images/icons/closeIcon.svg";
import {ReactComponent as TrashIcon} from "../../../../images/icons/trash.svg";
import Button, {ButtonType} from "../../../atoms/buttons and links/Button";

export interface MessageDetailsPopupProps extends PopupProps {
    message: Message | null;
    onClose: () => void;
    onMessageDelete?: (message: Message) => void;
}

const MessageDetailsPopup: React.FC<MessageDetailsPopupProps> = ({message, isPopupShown, onClose, onMessageDelete}) => {
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
                <div className="max-h-full rounded-xl <md:w-screen <md:h-screen p-8 bg-white dark:bg-black overflow-y-scroll">
                    <div className="flex flex-row">
                        <button onClick={_ => onClose()}><CloseIcon className=">md:hover:text-gray-600 fill-current"/></button>
                        <Spacer />
                        <button onClick={handleMessageDelete}>
                            <TrashIcon className="w-5 text-red-600 >md:hover:text-red-900 fill-current" />
                        </button>
                    </div>
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
                    <Button
                        label={"reply"}
                        action={handleReplyClick}
                        type={ButtonType.constructive}
                        className="py-3 px-5 w-full"
                    />
                </div>
            )}
            <Spacer />
        </Popup>
    );
};

export default MessageDetailsPopup;
