import ExperienceModel, { stringRepresentation } from "../../../data/experience";
import React, { useState } from "react";
import Spacer from "../../atoms/Spacer";

export interface ExperienceProps {
    experience: ExperienceModel
}

const Experience: React.FC<ExperienceProps> = ({experience}) => {
    const [areDetailsHidden, setAreDetailsHidden] = useState(true);

    const handleHeaderClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setAreDetailsHidden(!areDetailsHidden);
    };

    const timeDescription = () => {
        if (!(experience.startingDate && experience.endDate)) {
            return null;
        }

        const className = "text-gray-600 border-b border-black dark:border-white dark:text-white p-0.5 mt-1 pl-2 pr-2";

        if (experience.endDate === "ongoing") {
            return <h4 className={className}>{`Ongoing, started in ${stringRepresentation(experience.startingDate?.toDate())}`}</h4>;
        }

        const startingDate = experience.startingDate.toDate();
        const endDate = experience.endDate.toDate();

        const startingMonth = startingDate.getUTCMonth() + 1;
        const startingYear = startingDate.getUTCFullYear();

        const endMonth = endDate.getUTCMonth() + 1;
        const endYear = endDate.getUTCFullYear();

        let monthsDifference = endYear * 12 + endMonth;
        monthsDifference -= startingYear * 12 + startingMonth - 1;

        if (monthsDifference === 1) {
            if (monthsDifference < 12) {
                return <h4 className={className}>
                    {`${stringRepresentation(experience.startingDate.toDate())} 
                (${monthsDifference} month${monthsDifference === 1 ? "" : "s"})`}
                </h4>;
            }
        }

        if (monthsDifference < 12) {
            return <h4 className={className}>
                {`${stringRepresentation(experience.startingDate.toDate())} - ${stringRepresentation(experience.endDate.toDate())} 
                (${monthsDifference} month${monthsDifference === 1 ? "" : "s"})`}
            </h4>;
        }

        let years = Math.floor(monthsDifference / 12);
        let months = monthsDifference - Math.floor(monthsDifference / 12);

        return <h4 className={className}>
            {`${stringRepresentation(experience.startingDate.toDate())} - ${stringRepresentation(experience.endDate.toDate())} 
            (${years} year${years === 1 ? "" : "s"} and ${months} month${months === 1 ? "" : "s"})`}
        </h4>;
    };

    return (
        <div className="pb-12">
            <div className="flex flex-row sticky bg-white dark:bg-gray-900 top-12 border-t-2 border-black dark:border-white p-2" onClick={handleHeaderClick}>
                <h3>
                    {experience.title}
                </h3>
                <Spacer />
                <button onClick={(_) => setAreDetailsHidden(!areDetailsHidden)}>
                    {areDetailsHidden ? "More" : "Less"}
                </button>
            </div>
            <div onClick={handleHeaderClick}>{timeDescription()}</div>
            <div className={`${areDetailsHidden ? "max-h-0" : "max-h-inf"} overflow-hidden transition-max-h duration-1000 ease-in-out`}>
                <p className="p-2">
                    {experience.description + " "}
                    {
                        experience.link && <a href={experience.link} target="_blank" rel="noopener noreferrer">
                            {
                                experience.linkText || "More"
                            }
                        </a>
                    }
                </p>
            </div>
        </div>
    );
};

export default Experience;