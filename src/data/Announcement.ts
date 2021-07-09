import {Timestamp} from "./database";

export enum AnnouncementType {
    text = "text",
    facebookPost = "facebookPost",
    linkedInPost = "linkedInPost"
}

interface Announcement {
    id: string;
    title: string;
    type: AnnouncementType;
    timestamp: Timestamp;
    content: string;
}

export default Announcement;