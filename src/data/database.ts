import firebase from 'firebase/app';
import "firebase/firestore";
import Experience from "./experience";
import Role from "./Role";
import Message from "./Message";
import User from "./User";

export interface CollectionData {
    id?: string;
}

if (firebase.apps.length === 0) {
    firebase.initializeApp({
        apiKey: "AIzaSyDZjX5mSBoF_ebDTlcLUDJFuRo6Iz_-3WQ",
        authDomain: "aboodaniel-website.firebaseapp.com",
        projectId: "aboodaniel-website",
        storageBucket: "aboodaniel-website.appspot.com",
        messagingSenderId: "366395000913",
        appId: "1:366395000913:web:c846d73944c2db09751070"
    });
}

export class Collection<T extends CollectionData> {
    collectionReference: firebase.firestore.CollectionReference;

    constructor(collectionPath: string) {
        this.collectionReference = firebase.firestore().collection(collectionPath);
    }

    async getAll(sort?: {field: string, direction: OrderDirection}): Promise<T []> {
        try {
            let results;

            if (sort) {
                results = await this.collectionReference
                    .orderBy(sort.field, sort.direction)
                    .get()
            } else {
                results = await this.collectionReference
                    .get()
            }

            return results.docs.map<T>((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                } as T;
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async get(id: string): Promise<T> {
        try {
            const result = await this.collectionReference
                .doc(id)
                .get();

            return {
                id: result.id,
                ...result.data()
            } as T;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async post(newDocument: T) {
        const {id, ...data} = newDocument;

        return this.collectionReference.doc(id).set(data);
    }

    async pushToArray<Element>(id: string, field: string, newElement: Element) {
        const documentReference = this.collectionReference.doc(id);
        return firebase.firestore()
            .runTransaction(transaction => {
                return transaction
                    .get(documentReference)
                    .then(document => {
                        if (!document.exists) {
                            throw Error("Document does not exist!");
                        }
                        const data = document.data();
                        const array = data ? data[field] : [];
                        const newArray = [...array, newElement];

                        transaction.update(documentReference, { users: newArray });
                    });
            })
    }
}

const database = {
    experiences: new Collection<Experience>("experiences"),
    messages: new Collection<Message>("messages"),
    roles: new Collection<Role>("roles"),
    users: new Collection<User>("users"),
};

export class Timestamp extends firebase.firestore.Timestamp {}
export type OrderDirection = firebase.firestore.OrderByDirection;

export const timestampToString = (timestamp: Timestamp, showTimeOnFullDate?: boolean) => {
    const messageDate = timestamp.toDate();
    const today = new Date(Date.now());

    let hours = `${messageDate.getHours()}`;
    let minutes = `${messageDate.getMinutes()}`;

    if (hours === "0") {
        hours = "00";
    }

    if (minutes === "0") {
        minutes = "00";
    }

    if (today.getFullYear() === messageDate.getFullYear() &&
        today.getMonth() === messageDate.getMonth() &&
        today.getDate() === messageDate.getDate()) {
        return `${hours}:${minutes}`;
    }

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.getDate() === yesterday.getDate() &&
        messageDate.getMonth() === yesterday.getMonth() &&
        messageDate.getFullYear() === yesterday.getFullYear()) {
        return `Yesterday at ${hours}:${minutes}`;
    }

    let firstDayOfTheWeek = new Date();
    firstDayOfTheWeek.setDate(firstDayOfTheWeek.getDate() - 7);

    // if date is equal or within the first and last dates of the week
    if (messageDate >= firstDayOfTheWeek) {
        const dayUTC = messageDate.getDay();

        let description = "";

        if (dayUTC === 1) {
            description = "Monday";
        } else if (dayUTC === 2) {
            description = "Tuesday";
        } else if (dayUTC === 3) {
            description = "Wednesday";
        } else if (dayUTC === 4) {
            description = "Thursday";
        } else if (dayUTC === 5) {
            description = "Friday"
        } else if (dayUTC === 6) {
            description = "Saturday"
        } else {
            description = "Sunday";
        }

        description += ` at ${hours}:${minutes}`;

        return description;
    }

    const day = messageDate.getDate();
    const month = messageDate.getMonth() + 1;
    const year = messageDate.getFullYear();

    return `${showTimeOnFullDate ? `${hours}:${minutes} ` : ""}${day}/${month}/${year}`;
};

export default database;

