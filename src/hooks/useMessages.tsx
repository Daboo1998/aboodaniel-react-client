import {useEffect, useState} from "react";
import Message from "../data/Message";
import database, {Timestamp} from "../data/database";
import validator from "validator";

const useMessages = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messagesAreLoading, setMessagesAreLoading] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<Message | undefined>(undefined);

    useEffect(() => {
        setMessagesAreLoading(true);
        database.messages
            .getAll({field: "timestamp", direction: "desc"})
            .then((results) => {
                setMessages(results);
            })
            .catch(error => {
                console.error(error.message);
            })
            .finally(() => setMessagesAreLoading(false));
    }, []);

    const removeMessageOffline = (message: Message) => {
        setMessages(messages.filter(m => m.id !== message.id));
    };

    const selectMessage = (message?: Message) => {
        setSelectedMessage(message);
    };

    return {messages, messagesAreLoading, removeMessageOffline, selectedMessage, selectMessage}
};

export enum MessageField {
    Email, Name, Subject, Message
}

export const useSendMessage = (onSuccessfulSend?: () => void) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [sendMessageError, setSendMessageError] = useState<Error>();
    const [sendingMessage, setSendingMessage] = useState(false);

    const setField = (field: MessageField, value: string) => {
        switch (field) {
            case MessageField.Email:
                setEmail(value);
                break;
            case MessageField.Name:
                setName(value);
                break;
            case MessageField.Subject:
                setSubject(value);
                break;
            case MessageField.Message:
                setMessage(value);
                break;
        }
    };

    const getField = (field: MessageField) => {
        switch (field) {
            case MessageField.Email:
                return email;
            case MessageField.Name:
                return name;
            case MessageField.Subject:
                return subject;
            case MessageField.Message:
                return message;
        }
    };

    const sendMessage = () => {
        setSendingMessage(true);
        setSendMessageError(undefined);
        if (email.length === 0) {
            setSendMessageError(Error("Email is required!"));
        } else if (name.length === 0) {
            setSendMessageError(Error("Name is required!"))
        } else if (subject.length === 0) {
            setSendMessageError(Error("Subject is required!"))
        } else if (message.length === 0) {
            setSendMessageError(Error("Message is required!"))
        } else if (!validator.isEmail(email)) {
            setSendMessageError(Error("Email is badly formatted! Example email: email@example.com"));
        } else {
            database.messages
                .post({
                    timestamp: Timestamp.now(),
                    email, name, subject, message
                })
                .then(onSuccessfulSend)
                .catch(setSendMessageError)
                .finally(() => setSendingMessage(false));
        }
    };

    return {sendMessage, sendingMessage, sendMessageError, getField, setField}
};

export default useMessages;