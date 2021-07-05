import React, {useState, useEffect} from "react";
import PageLayout from "../PageLayout";
import Message from "../../../../data/Message";
import database from "../../../../data/database";
import MessageDetailsPopup from "../../../molecules/popups/messages/MessageDetailsPopup";
import MessageComponent from "../../../atoms/messages/MessageComponent";
import {useHistory} from "react-router-dom";
import {useAuth} from "../../../../contexts/AuthContext";

const MessagesPageLayout: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    const {wentToLogin, isLoggedIn} = useAuth();
    const history = useHistory();

    if (isLoggedIn !== undefined && !isLoggedIn) {
        history.push("/login");
        wentToLogin("/messages");
    }

    useEffect(() => {
        database.messages
            .getAll({field: "timestamp", direction: "desc"})
            .then((results) => {
                setMessages(results);
            })
            .catch(error => {
                console.error(error.message);
            })
    }, []);

    const handleMessageDetailsClose = () => {
        setSelectedMessage(null);
        document.body.style.overflow = 'unset';
    };

    const handleMessageClick = (e: React.MouseEvent<HTMLDivElement>, message: Message) => {
        e.preventDefault();
        setSelectedMessage(message);
        document.body.style.overflow = 'hidden';
    };

    const handleMessageDelete = (message: Message) => {
        setMessages(messages.filter(m => m.id !== message.id));
    };
    
    return (
        <PageLayout>
            <MessageDetailsPopup
                message={selectedMessage}
                isPopupShown={!!selectedMessage}
                onClose={handleMessageDetailsClose}
                onMessageDelete={handleMessageDelete}
            />
            <h1>Messages</h1>
            <div className={(messages.length > 0 ? " border-t border-black dark:border-white mt-4" : "")}>
                {
                    messages.map((message) => {
                        return <MessageComponent message={message} onMessageClick={handleMessageClick}/>;
                    })
                }
            </div>
        </PageLayout>
    );
};

export default MessagesPageLayout;