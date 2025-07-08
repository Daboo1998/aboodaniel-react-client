import React, {useState, useEffect} from "react";
import PageLayout from "../PageLayout";
import Message from "../../../../data/Message";
import database from "../../../../data/database";
import MessageDetailsPopup from "../../../molecules/popups/messages/MessageDetailsPopup";
import MessageComponent from "../../../atoms/messages/MessageComponent";
import {useAuth} from "../../../../contexts/AuthContext";
import useNavigation from "../../../../hooks/useNavigation";
import {
    UnauthorizedContainer,
    UnauthorizedTitle,
    UnauthorizedMessage,
    MessagesTitle,
    MessagesContainer
} from "./MessagesPageLayout.styled";

const MessagesPageLayout: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    const {wentToLogin, isLoggedIn, isOwner} = useAuth();
    const navigation = useNavigation();

    if (isLoggedIn !== undefined && !isLoggedIn && isOwner !== undefined && !isOwner) {
        navigation.navigateTo("/login");
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

    if (!isOwner) {
        return (
            <PageLayout title="Messages">
                <UnauthorizedContainer>
                    <UnauthorizedTitle>Messages</UnauthorizedTitle>
                    <UnauthorizedMessage>You are not authorised to be here! Contact the administrator to get access to messages.</UnauthorizedMessage>
                </UnauthorizedContainer>
            </PageLayout>
        );
    }
    
    return (
        <PageLayout title="Messages">
            <MessageDetailsPopup
                message={selectedMessage}
                isPopupShown={!!selectedMessage}
                onClose={handleMessageDetailsClose}
                onMessageDelete={handleMessageDelete}
            />
            <MessagesTitle>Messages</MessagesTitle>
            <MessagesContainer $hasMessages={messages.length > 0}>
                {
                    messages.map((message) => {
                        return <MessageComponent key={message.id} message={message} onMessageClick={handleMessageClick}/>;
                    })
                }
            </MessagesContainer>
        </PageLayout>
    );
};

export default MessagesPageLayout;