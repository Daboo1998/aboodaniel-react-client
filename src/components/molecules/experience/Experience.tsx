import ExperienceModel, {
  stringRepresentation,
} from "../../../data/experience";
import React, { useState } from "react";
import Spacer from "../../atoms/utilities/Spacer";
import {
  ExperienceContainer,
  ExperienceHeader,
  ExperienceTitle,
  ToggleButton,
  TimeDescription,
  TimeDescriptionText,
  DetailsContainer,
  DetailsText
} from "./Experience.styled";

export interface ExperienceProps {
  experience: ExperienceModel;
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  const [areDetailsHidden, setAreDetailsHidden] = useState(true);

  const handleHeaderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setAreDetailsHidden(!areDetailsHidden);
  };

  const timeDescription = () => {
    if (!(experience.startingDate && experience.endDate)) {
      return null;
    }

    if (experience.endDate === "ongoing") {
      return (
        <TimeDescriptionText>
          {`Ongoing, started in ${stringRepresentation(
            experience.startingDate?.toDate()
          )}`}
        </TimeDescriptionText>
      );
    }

    const startingDate = experience.startingDate.toDate();
    const endDate = experience.endDate.toDate();

    const startingMonth = startingDate.getUTCMonth() + 1;
    const startingYear = startingDate.getUTCFullYear();

    const endMonth = endDate.getUTCMonth() + 1;
    const endYear = endDate.getUTCFullYear();

    let monthsDifference = endYear * 12 + endMonth;
    monthsDifference -= startingYear * 12 + startingMonth - 1;

    let years = Math.floor(monthsDifference / 12);
    let months = (monthsDifference % 12) - 1;

    return (
      <TimeDescriptionText>
        {`${stringRepresentation(
          experience.startingDate.toDate()
        )} - ${stringRepresentation(experience.endDate.toDate())} 
            (${
              years > 0 ? `${years} year${years === 1 ? "" : "s"} and ` : ""
            }${months} month${months === 1 ? "" : "s"})`}
      </TimeDescriptionText>
    );
  };

  return (
    <ExperienceContainer>
      <ExperienceHeader onClick={handleHeaderClick}>
        <ExperienceTitle>{experience.title}</ExperienceTitle>
        <Spacer />
        <ToggleButton onClick={(_) => setAreDetailsHidden(!areDetailsHidden)}>
          {areDetailsHidden ? "More" : "Less"}
        </ToggleButton>
      </ExperienceHeader>
      <TimeDescription onClick={handleHeaderClick}>
        {timeDescription()}
      </TimeDescription>
      <DetailsContainer $isHidden={areDetailsHidden}>
        <DetailsText>
          {experience.description + " "}
          {experience.link && (
            <a href={experience.link} target="_blank" rel="noopener noreferrer">
              {experience.linkText || "More"}
            </a>
          )}
        </DetailsText>
      </DetailsContainer>
    </ExperienceContainer>
  );
};

export default Experience;
