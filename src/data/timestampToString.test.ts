import firebase from "firebase/app";
import "firebase/firestore";
import { timestampToString } from "./database";

describe("timestampToString", () => {
    it("pads single digit hours and minutes with leading zeros", () => {
        const date = new Date();
        date.setHours(5, 3, 0, 0);
        const timestamp = firebase.firestore.Timestamp.fromDate(date);

        const formatted = timestampToString(timestamp);

        expect(formatted).toBe("05:03");
    });
});
