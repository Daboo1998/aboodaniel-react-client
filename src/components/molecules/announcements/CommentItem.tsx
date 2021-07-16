import React, {useEffect, useState} from "react";
import Comment from "../../../data/Comment";
import Spacer from "../../atoms/utilities/Spacer";
import database, {Timestamp, timestampToString} from "../../../data/database";
import TextAreaInput from "../../atoms/input/TextAreaInput";
import Button, {ButtonSize, ButtonType} from "../../atoms/buttons and links/Button";

export interface CommentItemProps {
    comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({comment}) => {
    const [comments, setComments] = useState<Comment []>([]);
    const [showComments, setShowComments] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [newCommentText, setNewCommentText] = useState("");

    const reload = () => {
        if (comment.id)
            database.comments
                .getUsingReferenceField("parent", database.comments, comment.id)
                .then(setComments);

        setNewCommentText("");
    };

    useEffect(reload, []);

    const handleCommentSubmit: React.FormEventHandler = (event) => {
        event.preventDefault();
        setErrorMessage(undefined);
        database.comments
            .post({
                isGuest: true,
                content: newCommentText,
                timestamp: Timestamp.now(),
                parent: database.comments.collectionReference.doc(comment.id),
            })
            .then(reload)
            .catch(error => {
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="bg-white rounded p-2 shadow-md w-full">
            <div className="flex flex-row">
                <h4>{comment.isGuest ? "Guest" : comment.userDisplayName}</h4>
                <Spacer />
                <p>{timestampToString(comment.timestamp)}</p>
            </div>
            <p>{comment.content}</p>
            {
                comments.length > 0 && (
                    <button className="text-blue-800 w-max" onClick={() => setShowComments(b => !b)}>
                        {comments.length} Comment{comments.length > 1 && "s"}
                    </button>
                )
            }
            {showComments && (
                comments.map((comment) => {
                    return (
                        <div className="flex flex-row items-center">
                            <CommentItem comment={comment} key={comment.id} />
                        </div>
                    );
                })
            )}
            <form className="w-full flex flex-row items-start" onSubmit={handleCommentSubmit}>
                <TextAreaInput
                    name="comment"
                    label="Comment"
                    placeholder="Enter comment..."
                    onChange={setNewCommentText}
                    value={newCommentText}
                    automaticHeight/>
                <Button label="Send" size={ButtonSize.small} type={ButtonType.constructive} className="top-2 relative ml-2"/>
            </form>
            {errorMessage && <p className="text-red-700">{errorMessage}</p>}
        </div>
    )
};

export default CommentItem;