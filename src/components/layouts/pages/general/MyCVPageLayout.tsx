import React, {useEffect, useState} from 'react';
import PageLayout from "../PageLayout";
import SkillSet from "../../../../data/SkillSet";
import database, {timestampToString} from "../../../../data/database";
import Experience from "../../../../data/experience";
import Spacer from "../../../atoms/utilities/Spacer";
import EducationItem from "../../../../data/EducationItem";
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
    ContactInfo
} from "./MyCVPageLayout.styled";

const MyCVPageLayout: React.FC = () => {
    const [skillSets, setSkillSets] = useState<SkillSet []>([]);
    const [education, setEducation] = useState<EducationItem []>([]);
    const [experiences, setExperiences] = useState<Experience []>([]);

    useEffect(() => {
        database.skillSets.getAll()
            .then(skillSets => {
                setSkillSets(skillSets);
            });

        database.experiences.getAll({field: "importance", direction: "desc"})
            .then(experiences => {
                setExperiences(experiences);
            });

        database.education.getAll({field: "endYear", direction: "desc"})
            .then(items => {
               setEducation(items);
            });
    }, []);

    return (
        <PageLayout title="CV">
            <CVContainer>
                <CVTitle>Curriculum Vitae</CVTitle>
                <CVMainContainer>
                    <ContentColumn>
                        <Section>
                            <SectionTitle>About Me</SectionTitle>
                            <AboutText>
                                I have been always, looking into the future, wanting to create new solutions using technology
                                to change how we live our everyday lives. My mission is to innovate, while also make my work
                                to be understood by others and be able to work together with people. Creativity, my pursuit
                                after my goals and my determination are my main attributes. I always try my best to
                                understand the needs of people I work with, and find a way for all parties to be happy.
                            </AboutText>
                        </Section>
                        
                        <Section>
                            <SectionTitle>Skills</SectionTitle>
                            {skillSets.map((skillSet) => {
                                return (
                                    <SkillSetContainer key={skillSet.name}>
                                        <SkillSetTitle>{skillSet.name}</SkillSetTitle>
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
                            <SectionTitle className="with-top-padding">Experience</SectionTitle>
                            {experiences.map((experience) => {
                                return (
                                    <ExperienceItem key={experience.title}>
                                        <ExperienceTitle>{experience.title}</ExperienceTitle>
                                        <ExperienceDate>
                                            {experience.endDate === "ongoing" && "Started in "}
                                            {experience?.startingDate && timestampToString(experience.startingDate, false, false)} 
                                            {experience.endDate && (experience.endDate === "ongoing" ? "(ongoing)" : ("- " + timestampToString(experience.endDate, false, false)))}
                                        </ExperienceDate>
                                        <ExperienceDescription>{experience.description}</ExperienceDescription>
                                    </ExperienceItem>
                                )
                            })}
                        </ExperienceSection>
                        
                        <EducationSection>
                            <SectionTitle className="with-top-padding">Education</SectionTitle>
                            {education.map(item => {
                                return (
                                    <StyledEducationItem key={item.qualification}>
                                        <EducationTitle>{item.qualification}</EducationTitle>
                                        <EducationPlace>{item.place}</EducationPlace>
                                        <EducationYears>{item.startYear} - {item.endYear}</EducationYears>
                                    </StyledEducationItem>
                                );
                            })}
                        </EducationSection>
                    </ContentColumn>
                    
                    <Spacer />
                    
                    <ProfileColumn>
                        <ProfileImage src="/images/me.jpg" alt="Daniel Richard Aboo" />
                        <ProfileInfo>
                            <ProfileName>Daniel Richard Aboo</ProfileName>
                            <ProfileTitle>Front-end Developer</ProfileTitle>
                            <ContactInfo>
                                Mobile: <a href="tel:+48601951169">+48 601 951 169</a>
                            </ContactInfo>
                            <ContactInfo className="email-only">
                                Email: <a href="mailto:daboo1998@gmail.com">daboo1998@gmail.com</a>
                            </ContactInfo>
                        </ProfileInfo>
                    </ProfileColumn>
                </CVMainContainer>
            </CVContainer>
        </PageLayout>
    );
};

export default MyCVPageLayout;