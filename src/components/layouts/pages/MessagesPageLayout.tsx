import React, {useState, useEffect} from "react";
import PageLayout from "../PageLayout";
import Message from "../../../data/Message";
import database, {timestampToString} from "../../../data/database";
import Spacer from "../../atoms/Spacer";
import MessageDetailsPopup from "../../molecules/MessageDetailsPopup";

const MessagesPageLayout: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

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
    
    return (
        <PageLayout>
            <MessageDetailsPopup message={selectedMessage} isPopupShown={!!selectedMessage} onClose={handleMessageDetailsClose} />
            <h1>Messages</h1>
            <div className={(messages.length > 0 ? " border-t border-black mt-4" : "")}>
                {
                    messages.map((message) => {
                        return (<div className="pb-2 border-b border-black" onClick={e => handleMessageClick(e, message)}>
                            <div className="flex flex-row">
                                <h4>{message.name}</h4>
                                <Spacer />
                                <p className="flex-shrink-0">{timestampToString(message.timestamp)}</p>
                            </div>
                            <h5>{message.subject}</h5>
                            {/* - TODO: Make message body preview instead of showing the whole message */}
                            <p className="line-clamp-3">{message.message}</p>
                        </div>)
                    })
                }
            </div>
        </PageLayout>
    );
};

export default MessagesPageLayout;