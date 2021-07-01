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

    async getAll(): Promise<T []> {
        try {
            const results = await this.collectionReference
                .get();

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

export default database;

