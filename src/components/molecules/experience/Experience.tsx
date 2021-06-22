import { Experience as ExperienceType, stringRepresentation } from "../../../data/experience";
import React, { useState } from "react";
import Spacer from "../../atoms/Spacer";

export interface ExperienceProps {
    experience: ExperienceType
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

        const className = "text-gray-600 border-b border-black p-0.5 mt-1 pl-2 pr-2";

        if (experience.endDate === "ongoing") {
            return <h4 className={className}>{`Ongoing, started in ${stringRepresentation(experience.startingDate)}`}</h4>;
        }

        let monthsDifference = experience.endDate.year * 12 + experience.endDate.month;
        monthsDifference -= experience.startingDate.year * 12 + experience.startingDate.month - 1;

        if (monthsDifference === 1) {
            if (monthsDifference < 12) {
                return <h4 className={className}>
                    {`${stringRepresentation(experience.startingDate)} 
                (${monthsDifference} month${monthsDifference === 1 ? "" : "s"})`}
                </h4>;
            }
        }

        if (monthsDifference < 12) {
            return <h4 className={className}>
                {`${stringRepresentation(experience.startingDate)} - ${stringRepresentation(experience.endDate)} 
                (${monthsDifference} month${monthsDifference === 1 ? "" : "s"})`}
            </h4>;
        }

        let years = Math.floor(monthsDifference / 12);
        let months = monthsDifference - Math.floor(monthsDifference / 12);

        return <h4 className={className}>
            {`${stringRepresentation(experience.startingDate)} - ${stringRepresentation(experience.endDate)} 
            (${years} year${years === 1 ? "" : "s"} and ${months} month${months === 1 ? "" : "s"})`}
        </h4>;
    };

    return (
        <div className="pb-12">
            <div className="flex flex-row sticky bg-white top-12 border-t-2 border-black p-2" onClick={handleHeaderClick}>
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