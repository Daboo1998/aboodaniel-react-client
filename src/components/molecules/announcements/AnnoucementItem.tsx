import React, {useEffect, useState} from "react";
import Announcement from "../../../data/Announcement";
import Spacer from "../../atoms/utilities/Spacer";
import database, {Timestamp, timestampToString} from "../../../data/database";
import ReactMarkdown from "react-markdown";
import Comment from "../../../data/Comment";
import CommentItem from "./CommentItem";
import TextAreaInput from "../../atoms/input/TextAreaInput";
import Button, {ButtonSize, ButtonType} from "../../atoms/buttons and links/Button";
import {useAuth} from "../../../contexts/AuthContext";

export interface AnnouncementItemProps {
    announcement: Announcement;
}

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({announcement}) => {
    const [comments, setComments] = useState<Comment []>([]);
    const [newCommentText, setNewCommentText] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const auth = useAuth();

    const reload = () => {
        database.comments
            .getUsingReferenceField("parent", database.announcements, announcement.id)
            .then(setComments);

        setNewCommentText("");
    };

    useEffect(reload, [announcement.id]);

    const handleCommentSubmit: React.FormEventHandler = (event) => {
        event.preventDefault();
        setErrorMessage(undefined);
        database.comments
            .post({
                isGuest: auth.isLoggedIn === undefined || !auth.isLoggedIn,
                userDisplayName: auth.user?.displayName ? auth.user.displayName : undefined,
                userId: auth.user?.uid,
                content: newCommentText,
                timestamp: Timestamp.now(),
                parent: database.announcements.collectionReference.doc(announcement.id),
            })
            .then(reload)
            .catch(error => {
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="flex flex-col space-y-2 rounded-xl p-3 bg-gray-200 dark:bg-gray-700 shadow-md border border-gray-300 dark:border-black">
            <div className="flex flex-row">
                <h2>{announcement.title}</h2>
                <Spacer />
                <p>{timestampToString(announcement.timestamp)}</p>
            </div>
            <ReactMarkdown className="whitespace-pre-wrap">{announcement.content}</ReactMarkdown>
            <button className="text-blue-800 dark:text-blue-200 w-max" onClick={() => setShowComments(b => !b)}>
                {comments.length} Comment{comments.length > 1 && "s"}
            </button>

            {
                showComments && (
                    comments.map((comment) => {
                        return <CommentItem comment={comment}/>
                    })
                )
            }
            <form className="w-full flex flex-row items-start" onSubmit={handleCommentSubmit}>
                <TextAreaInput
                    name="comment"
                    placeholder="Enter comment..."
                    value={newCommentText}
                    onChange={setNewCommentText}
                    automaticHeight/>
                <Button label="Send" size={ButtonSize.small} type={ButtonType.constructive} className="relative bottom-4 ml-2"/>
            </form>
            {errorMessage && <p className="text-red-700">{errorMessage}</p>}
        </div>
    );
};


export default AnnouncementItem;