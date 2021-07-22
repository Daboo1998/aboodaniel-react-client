import {useEffect, useState} from "react";
import Message from "../data/Message";
import database from "../data/database";

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

export default useMessages;