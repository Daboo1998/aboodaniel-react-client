import React, { useEffect, useState } from "react";
import PageLayout from "../PageLayout";
import SkillSet from "../../../../data/SkillSet";
import database, { timestampToString } from "../../../../data/database";
import Experience from "../../../../data/experience";

import EducationItem from "../../../../data/EducationItem";
import { useAuth } from "../../../../contexts/AuthContext";
import AddExperiencePopup from "../../../molecules/popups/experience/AddExperiencePopup";
import EditExperiencePopup from "../../../molecules/popups/experience/EditExperiencePopup";
import usePopup from "../../../../hooks/usePopup";
import RemoveExperiencesPopup from "../../../molecules/popups/experience/RemoveExperiencesPopup";
import AddEducationPopup from "../../../molecules/popups/education/AddEducationPopup";
import EditEducationPopup from "../../../molecules/popups/education/EditEducationPopup";
import RemoveEducationPopup from "../../../molecules/popups/education/RemoveEducationPopup";
import AddSkillSetPopup from "../../../molecules/popups/skillset/AddSkillSetPopup";
import EditSkillSetPopup from "../../../molecules/popups/skillset/EditSkillSetPopup";
import RemoveSkillSetPopup from "../../../molecules/popups/skillset/RemoveSkillSetPopup";
import Button, {
  ButtonSize,
  ButtonType,
} from "../../../atoms/buttons and links/Button";
import {
  CVContainer,
  CVTitle,
  CVMainContainer,
  ContentColumn,
  Section,
  SectionTitle,
  AboutText,
  SkillSetContainer,
  SkillSetTitle,
  SkillsList,
  SkillItem,
  HobbiesContainer,
  HobbyItem,
  ExperienceSection,
  ExperienceItem,
  ExperienceTitle,
  ExperienceDate,
  ExperienceDescription,
  EducationSection,
  EducationItem as StyledEducationItem,
  EducationTitle,
  EducationPlace,
  EducationYears,
  ProfileColumn,
  ProfileImage,
  ProfileInfo,
  ProfileName,
  ProfileTitle,
  ContactInfo,
} from "./MyCVPageLayout.styled";

const MyCVPageLayout: React.FC = () => {
  const [skillSets, setSkillSets] = useState<SkillSet[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  // Experience management functionality
  const auth = useAuth();
  const [
    isAddExperiencePopupShown,
    showAddExperiencePopup,
    hideAddExperiencePopup,
  ] = usePopup();
  const [
    isEditExperiencePopupShown,
    showEditExperiencePopup,
    hideEditExperiencePopup,
  ] = usePopup();
  const [
    isRemoveExperiencesPopupShown,
    showRemoveExperiencesPopup,
    hideRemoveExperiencesPopup,
  ] = usePopup();
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  // Education management functionality
  const [
    isAddEducationPopupShown,
    showAddEducationPopup,
    hideAddEducationPopup,
  ] = usePopup();
  const [
    isEditEducationPopupShown,
    showEditEducationPopup,
    hideEditEducationPopup,
  ] = usePopup();
  const [
    isRemoveEducationPopupShown,
    showRemoveEducationPopup,
    hideRemoveEducationPopup,
  ] = usePopup();
  const [selectedEducation, setSelectedEducation] =
    useState<EducationItem | null>(null);

  // Skill set management functionality
  const [
    isAddSkillSetPopupShown,
    showAddSkillSetPopup,
    hideAddSkillSetPopup,
  ] = usePopup();
  const [
    isEditSkillSetPopupShown,
    showEditSkillSetPopup,
    hideEditSkillSetPopup,
  ] = usePopup();
  const [
    isRemoveSkillSetPopupShown,
    showRemoveSkillSetPopup,
    hideRemoveSkillSetPopup,
  ] = usePopup();
  const [selectedSkillSet, setSelectedSkillSet] =
    useState<SkillSet | null>(null);

  const onAddButtonClick = () => {
    window.document.body.style.overflow = "hidden";
    showAddExperiencePopup();
  };

  const onEditButtonClick = (experience: Experience) => {
    setSelectedExperience(experience);
    window.document.body.style.overflow = "hidden";
    showEditExperiencePopup();
  };

  const onRemoveButtonClick = () => {
    window.document.body.style.overflow = "hidden";
    showRemoveExperiencesPopup();
  };

  // Education handlers
  const onAddEducationClick = () => {
    window.document.body.style.overflow = "hidden";
    showAddEducationPopup();
  };

  const onEditEducationClick = (educationItem: EducationItem) => {
    setSelectedEducation(educationItem);
    window.document.body.style.overflow = "hidden";
    showEditEducationPopup();
  };

  const onRemoveEducationClick = () => {
    window.document.body.style.overflow = "hidden";
    showRemoveEducationPopup();
  };

  // Skill set handlers
  const onAddSkillSetClick = () => {
    window.document.body.style.overflow = "hidden";
    showAddSkillSetPopup();
  };

  const onEditSkillSetClick = (skillSet: SkillSet) => {
    setSelectedSkillSet(skillSet);
    window.document.body.style.overflow = "hidden";
    showEditSkillSetPopup();
  };

  const onRemoveSkillSetClick = () => {
    window.document.body.style.overflow = "hidden";
    showRemoveSkillSetPopup();
  };

  const onAddExperienceClose = (addedExperience?: Experience) => {
    hideAddExperiencePopup();
    if (addedExperience) {
      // Add new experience and sort by importance in descending order
      const updatedExperiences = [...experiences, addedExperience].sort(
        (a, b) => b.importance - a.importance
      );
      setExperiences(updatedExperiences);
    }
    window.document.body.style.overflow = "unset";
  };

  const onEditExperienceClose = (updatedExperience?: Experience) => {
    hideEditExperiencePopup();
    if (updatedExperience) {
      // Update the experience and sort by importance in descending order
      const updatedExperiences = experiences
        .map((exp) =>
          exp.id === updatedExperience.id ? updatedExperience : exp
        )
        .sort((a, b) => b.importance - a.importance);
      setExperiences(updatedExperiences);
    }
    window.document.body.style.overflow = "unset";
  };

  const onRemoveExperiencesClose = (
    removedExperiences?: Experience[]
  ): void => {
    hideRemoveExperiencesPopup();
    if (removedExperiences) {
      const removedIds = removedExperiences.map((exp) => exp.id);
      setExperiences(
        experiences.filter((exp) => !removedIds.includes(exp.id))
      );
    }
    window.document.body.style.overflow = "unset";
  };

  // Education close handlers
  const onAddEducationClose = (addedEducation?: EducationItem) => {
    hideAddEducationPopup();
    if (addedEducation) {
      const updatedEducation = [...education, addedEducation].sort((a, b) => {
        if (b.endYear === "ongoing") return 1;
        if (a.endYear === "ongoing") return -1;
        return parseInt(b.endYear) - parseInt(a.endYear);
      });
      setEducation(updatedEducation);
    }
    window.document.body.style.overflow = "unset";
  };

  const onEditEducationClose = (updatedEducation?: EducationItem) => {
    hideEditEducationPopup();
    if (updatedEducation) {
      const updatedEducationList = education
        .map((edu) =>
          edu.id === updatedEducation.id ? updatedEducation : edu
        )
        .sort((a, b) => {
          if (b.endYear === "ongoing") return 1;
          if (a.endYear === "ongoing") return -1;
          return parseInt(b.endYear) - parseInt(a.endYear);
        });
      setEducation(updatedEducationList);
    }
    window.document.body.style.overflow = "unset";
  };

  const onRemoveEducationClose = (deletedIds?: string[]) => {
    hideRemoveEducationPopup();
    if (deletedIds) {
      setEducation(education.filter((edu) => !deletedIds.includes(edu.id)));
    }
    window.document.body.style.overflow = "unset";
  };

  // Skill set close handlers
  const onAddSkillSetClose = (addedSkillSet?: SkillSet) => {
    hideAddSkillSetPopup();
    if (addedSkillSet) {
      setSkillSets([...skillSets, addedSkillSet]);
    }
    window.document.body.style.overflow = "unset";
  };

  const onEditSkillSetClose = (updatedSkillSet?: SkillSet) => {
    hideEditSkillSetPopup();
    if (updatedSkillSet) {
      setSkillSets(
        skillSets.map((skillSet) =>
          skillSet.id === updatedSkillSet.id ? updatedSkillSet : skillSet
        )
      );
    }
    window.document.body.style.overflow = "unset";
  };

  const onRemoveSkillSetClose = (deletedIds?: string[]) => {
    hideRemoveSkillSetPopup();
    if (deletedIds) {
      setSkillSets(skillSets.filter((skillSet) => !deletedIds.includes(skillSet.id)));
    }
    window.document.body.style.overflow = "unset";
  };

  useEffect(() => {
    database.skillSets.getAll().then((skillSets) => {
      setSkillSets(skillSets);
    });

    database.experiences
      .getAll({ field: "importance", direction: "desc" })
      .then((experiences) => {
        setExperiences(experiences);
      });

    database.education
      .getAll({ field: "endYear", direction: "desc" })
      .then((items) => {
        setEducation(items);
      });
  }, []);

  return (
    <>
      <AddExperiencePopup
        isPopupShown={isAddExperiencePopupShown}
        onClose={onAddExperienceClose}
      />
      <EditExperiencePopup
        isPopupShown={isEditExperiencePopupShown}
        experience={selectedExperience}
        onClose={onEditExperienceClose}
      />
      <RemoveExperiencesPopup
        isPopupShown={isRemoveExperiencesPopupShown}
        experiences={experiences}
        onClose={onRemoveExperiencesClose}
      />
      <AddEducationPopup
        isPopupShown={isAddEducationPopupShown}
        onClose={onAddEducationClose}
      />
      <EditEducationPopup
        isPopupShown={isEditEducationPopupShown}
        education={selectedEducation}
        onClose={onEditEducationClose}
      />
      <RemoveEducationPopup
        isPopupShown={isRemoveEducationPopupShown}
        educationItems={education}
        onClose={onRemoveEducationClose}
      />
      <AddSkillSetPopup
        isPopupShown={isAddSkillSetPopupShown}
        onClose={onAddSkillSetClose}
      />
      <EditSkillSetPopup
        isPopupShown={isEditSkillSetPopupShown}
        skillSet={selectedSkillSet}
        onClose={onEditSkillSetClose}
      />
      <RemoveSkillSetPopup
        isPopupShown={isRemoveSkillSetPopupShown}
        skillSets={skillSets}
        onClose={onRemoveSkillSetClose}
      />
      <PageLayout title="CV">
        <CVContainer>
          {/* Experience Management Popups */}
          {/* Education Management Popups */}

          <CVTitle>Curriculum Vitae</CVTitle>
          <CVMainContainer>
            <ContentColumn>
              <Section>
                <SectionTitle>About Me</SectionTitle>
                <AboutText>
                  I have been always, looking into the future, wanting to create
                  new solutions using technology to change how we live our
                  everyday lives. My mission is to innovate, while also make my
                  work to be understood by others and be able to work together
                  with people. Creativity, my pursuit after my goals and my
                  determination are my main attributes. I always try my best to
                  understand the needs of people I work with, and find a way for
                  all parties to be happy.
                </AboutText>
              </Section>

              <Section>
                <SectionTitle>
                  Skills
                  {auth.isOwner && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <Button
                        label="Add"
                        action={onAddSkillSetClick}
                        size={ButtonSize.small}
                        type={ButtonType.constructive}
                      />
                      <Button
                        label="Remove"
                        action={onRemoveSkillSetClick}
                        size={ButtonSize.small}
                        type={ButtonType.destructive}
                      />
                    </div>
                  )}
                </SectionTitle>
                {skillSets.map((skillSet) => {
                  return (
                    <SkillSetContainer key={skillSet.name}>
                      <SkillSetTitle>
                        {skillSet.name}
                        {auth.isOwner && (
                          <Button
                            label="Edit"
                            action={() => onEditSkillSetClick(skillSet)}
                            size={ButtonSize.small}
                            type={ButtonType.primary}
                            style={{ marginLeft: '10px' }}
                          />
                        )}
                      </SkillSetTitle>
                      <SkillsList>
                        {skillSet.skills.map((skill) => {
                          return (
                            <SkillItem key={skill}>
                              <p>{skill}</p>
                            </SkillItem>
                          );
                        })}
                      </SkillsList>
                    </SkillSetContainer>
                  );
                })}
              </Section>

              <Section>
                <SectionTitle className="with-top-padding">Hobbies</SectionTitle>
                <HobbiesContainer>
                  <HobbyItem>Programming</HobbyItem>
                  <HobbyItem>Piano</HobbyItem>
                  <HobbyItem>Traveling</HobbyItem>
                  <HobbyItem>Photography</HobbyItem>
                </HobbiesContainer>
              </Section>

              <ExperienceSection>
                <SectionTitle className="with-top-padding">
                  Experience
                </SectionTitle>
                {auth.isOwner && (
                  <div className="experience-admin-controls">
                    <Button
                      size={ButtonSize.small}
                      action={onAddButtonClick}
                      label="Add Experience"
                      type={ButtonType.constructive}
                    />
                    <Button
                      size={ButtonSize.small}
                      label="Remove Experiences"
                      action={onRemoveButtonClick}
                      type={ButtonType.destructive}
                    />
                  </div>
                )}
                {experiences.map((experience) => {
                  return (
                    <ExperienceItem key={experience.title}>
                      <div className="experience-content">
                        <ExperienceTitle>{experience.title}</ExperienceTitle>
                        <ExperienceDate>
                          {experience.endDate === "ongoing" && "Started in "}
                          {experience?.startingDate &&
                            timestampToString(
                              experience.startingDate,
                              false,
                              false
                            )}
                          {experience.endDate &&
                            (experience.endDate === "ongoing"
                              ? "(ongoing)"
                              : "- " +
                                timestampToString(
                                  experience.endDate,
                                  false,
                                  false
                                ))}
                        </ExperienceDate>
                        <ExperienceDescription>
                          {experience.description}
                        </ExperienceDescription>
                      </div>
                      {auth.isOwner && (
                        <div className="experience-edit-button">
                          <Button
                            size={ButtonSize.small}
                            action={() => onEditButtonClick(experience)}
                            label="Edit"
                            type={ButtonType.primary}
                          />
                        </div>
                      )}
                    </ExperienceItem>
                  );
                })}
              </ExperienceSection>

              <EducationSection>
                <SectionTitle className="with-top-padding">
                  Education
                  {auth.isOwner && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <Button
                        label="Add"
                        action={onAddEducationClick}
                        size={ButtonSize.small}
                        type={ButtonType.constructive}
                      />
                      <Button
                        label="Remove"
                        action={onRemoveEducationClick}
                        size={ButtonSize.small}
                        type={ButtonType.destructive}
                      />
                    </div>
                  )}
                </SectionTitle>
                {education.map((item) => {
                  return (
                    <StyledEducationItem key={item.qualification}>
                      <EducationTitle>{item.qualification}</EducationTitle>
                      <EducationPlace>{item.place}</EducationPlace>
                      <EducationYears>
                        {item.startYear} - {item.endYear}
                      </EducationYears>
                      {auth.isOwner && (
                        <div style={{ marginTop: '10px' }}>
                          <Button
                            label="Edit"
                            action={() => onEditEducationClick(item)}
                            size={ButtonSize.small}
                            type={ButtonType.primary}
                          />
                        </div>
                      )}
                    </StyledEducationItem>
                  );
                })}
              </EducationSection>
            </ContentColumn>

            <ProfileColumn>
              <ProfileImage src="/images/me.jpg" alt="Daniel Richard Aboo" />
              <ProfileInfo>
                <ProfileName>Daniel Richard Aboo</ProfileName>
                <ProfileTitle>Full-stack Developer, Prompt Engineer</ProfileTitle>
                <ContactInfo>
                  Mobile: <a href="tel:+48601951169">+48 601 951 169</a>
                </ContactInfo>
                <ContactInfo className="email-only">
                  Email: <a href="mailto:me@aboodaniel.pl">me@aboodaniel.pl</a>
                </ContactInfo>
              </ProfileInfo>
            </ProfileColumn>
          </CVMainContainer>
        </CVContainer>
      </PageLayout>
    </>
  );
};

export default MyCVPageLayout;
