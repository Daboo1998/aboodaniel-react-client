import {Timestamp, Reference} from "./database";

interface Comment {
    id?: string;
    timestamp: Timestamp;
    userId?: string;
    parent: Reference;
    userDisplayName?: string;
    isGuest: boolean;
    content: string;
}

export default Comment;