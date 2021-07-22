import React from "react";
import PageLayout from "../PageLayout";
import Message from "../../../../data/Message";
import MessageDetailsPopup from "../../../molecules/popups/messages/MessageDetailsPopup";
import MessageComponent from "../../../atoms/messages/MessageComponent";
import {useAuth} from "../../../../contexts/AuthContext";
import useNavigation from "../../../../hooks/useNavigation";
import useMessages from "../../../../hooks/useMessages";

const MessagesPageLayout: React.FC = () => {
    const {messages, messagesAreLoading, removeMessageOffline, selectedMessage, selectMessage} = useMessages();

    const {wentToLogin, isLoggedIn, isOwner} = useAuth();
    const navigation = useNavigation();

    if (isLoggedIn !== undefined && !isLoggedIn && isOwner !== undefined && !isOwner) {
        navigation.navigateTo("/login");
        wentToLogin("/messages");
    }

    const handleMessageDetailsClose = () => {
        selectMessage();
        document.body.style.overflow = 'unset';
    };

    const handleMessageClick = (e: React.MouseEvent<HTMLDivElement>, message: Message) => {
        e.preventDefault();
        selectMessage(message);
        document.body.style.overflow = 'hidden';
    };

    if (messagesAreLoading) {
        return (<PageLayout title="Messages">
            <div className="flex flex-col space-y-4">
                <h1>Messages</h1>
                <p className="text-gray-600 text-center">Loading...</p>
            </div>
        </PageLayout>);
    }

    if (!isOwner) {
        return (<PageLayout title="Messages">
              <div className="flex flex-col space-y-4">
                  <h1>Messages</h1>
                  <p>You are not authorised to be here! Contact the administrator to get access to messages.</p>
              </div>
        </PageLayout>);
    }
    
    return (
        <PageLayout title="Messages">
            <MessageDetailsPopup
                message={selectedMessage}
                isPopupShown={!!selectedMessage}
                onClose={handleMessageDetailsClose}
                onMessageDelete={removeMessageOffline}
            />
            <h1>Messages</h1>
            <div className={(messages.length > 0 ? " border-t border-black dark:border-white mt-4" : "")}>
                {
                    messages.map((message) => {
                        return <MessageComponent key={message.id} message={message} onMessageClick={handleMessageClick}/>;
                    })
                }
            </div>
        </PageLayout>
    );
};

export default MessagesPageLayout;