import {Timestamp} from "./database";

interface Message {
    id?: string;
    email: string;
    message: string;
    name: string;
    subject: string;
    timestamp: Timestamp;
}

export default Message;