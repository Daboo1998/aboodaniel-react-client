import {Timestamp} from "./database";

export const stringRepresentation = (date: Date, withDay: boolean = false) => {
    const newDate = new Date(date);
    const month = newDate.getUTCMonth() + 1;
    const year = newDate.getUTCFullYear();

    if (month === 1) {
        return `January, ${year}`;
    } else if (month === 2) {
        return `February, ${year}`;
    } else if (month === 3) {
        return `March, ${year}`;
    } else if (month === 4) {
        return `April, ${year}`;
    } else if (month === 5) {
        return `May, ${year}`;
    } else if (month === 6) {
        return `June, ${year}`;
    } else if (month === 7) {
        return `July, ${year}`;
    } else if (month === 6) {
        return `August, ${year}`;
    } else if (month === 6) {
        return `September, ${year}`;
    } else if (month === 6) {
        return `October, ${year}`;
    } else if (month === 6) {
        return `November, ${year}`;
    } else if (month === 6) {
        return `December, ${year}`;
    }

    return "";
};

interface Experience {
    id: string;
    importance: number,
    title: string,
    description: string,
    startingDate?: Timestamp,
    endDate?: Timestamp | "ongoing",
    link?: string,
    linkText?: string,
}

export default Experience;