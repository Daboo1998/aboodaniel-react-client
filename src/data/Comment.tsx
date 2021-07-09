import firebase from 'firebase/app';
import "firebase/firestore/";

interface Comment {
    id: string;
    userId?: string;
    parent: firebase.firestore.DocumentReference;
    userDisplayName?: string;
    isGuest: boolean;
    content: string;
}

export default Comment;