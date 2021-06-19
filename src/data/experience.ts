export interface ExperienceDate {
    month: number,
    year: number,
}

export const stringRepresentation = (date: ExperienceDate) => {
    if (date.month === 1) {
        return `January, ${date.year}`;
    } else if (date.month === 2) {
        return `February, ${date.year}`;
    } else if (date.month === 3) {
        return `March, ${date.year}`;
    } else if (date.month === 4) {
        return `April, ${date.year}`;
    } else if (date.month === 5) {
        return `May, ${date.year}`;
    } else if (date.month === 6) {
        return `June, ${date.year}`;
    } else if (date.month === 7) {
        return `July, ${date.year}`;
    } else if (date.month === 6) {
        return `August, ${date.year}`;
    } else if (date.month === 6) {
        return `September, ${date.year}`;
    } else if (date.month === 6) {
        return `October, ${date.year}`;
    } else if (date.month === 6) {
        return `November, ${date.year}`;
    } else if (date.month === 6) {
        return `December, ${date.year}`;
    }

    return "";
};

export interface Experience {
    importance: number,
    title: string,
    description: string,
    startingDate?: ExperienceDate,
    endDate?: ExperienceDate | "ongoing",
    link?: string,
    linkText?: string,
}

const experience: Experience[] = [
    {
        importance: 100,
        title: 'Sigbar (former Snakeware050)',
        description: 'Started in 2019, I have been working with a great team here at Sigbar. We have been developing' +
            ' great apps using technologies like Augmented Reality. I have already worked on two projects, a' +
            ' narrowcasting app for Apple TV designed to serve information to patients in the St Jansdal Hospital and' +
            ' an augmented reality app that is still in development. Because I am mostly working remotely, especially' +
            ' in times of COVID-19, I have learned to deliver on time and organise my time responsibly while having also' +
            ' to include my studies at the university. I have also worked on the site with my colleagues, and while' +
            ' doing so I have developed my team working skills further While working here, I have been able to polish' +
            ' my Swift skills further and also learn some new skills like API development skills, AI skills and more.' +
            ' I am looking forward to learning even more!',
        startingDate: { month: 5, year: 2019 },
        endDate: "ongoing",
        link: "https://sigbar.nl/",
        linkText: "Go to Sigbar.nl"
    },
    {
        importance: 90,
        title: "Millennium/Goodie",
        description: "I started off with an internship at Bank Millennium for 3 months, where I helped in the iOS" +
            " development section of the bank. After I returned from Mozambique I returned to work for the Bank and" +
            " worked for them for 3 months. I worked on an app called Goodie, which is a discount platform offering" +
            " loyalty programmes, discounts and more. At Bank Millennium I developed my programming skills with clean" +
            " code in Swift, using API services with Swift and much more. I worked with a great team and learnt the" +
            " importance of teamwork and the day to day challenges involved with communication and delivering on time.",
        link: "https://goodie.pl/",
        linkText: "Go to Goodie.pl",
        startingDate: { month: 5, year: 2018 },
        endDate: { month: 7, year: 2018 }
    },
    {
        importance: 1,
        title: "Volunteer at Girl MOVE",
        description: "Girl Move is a non profit organisation which helps young girls in Mozambique with education and" +
            " personal development. I was involved on a volunteer program where I helped with IT support and teaching" +
            " the girls how to use the computer. I experienced the life of people living in Mozambique, which on a" +
            " fundamental level helped me view the world from a totally new angle, and see the potential that Africa" +
            " offers that most of us tend to ignore..",
        link: "https://www.girlmove.org/",
        linkText: "Go to GirlMove",
        startingDate: { month: 2, year: 2018 },
        endDate: { month: 2, year: 2018 }
    }
];

export default experience;