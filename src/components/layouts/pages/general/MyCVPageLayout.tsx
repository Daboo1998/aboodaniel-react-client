import React, {useEffect, useState} from 'react';
import PageLayout from "../PageLayout";
import SkillSet from "../../../../data/SkillSet";
import database, {timestampToString} from "../../../../data/database";
import Experience from "../../../../data/experience";
import Spacer from "../../../atoms/utilities/Spacer";
import EducationItem from "../../../../data/EducationItem";

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
        <PageLayout title="CV" className="pt-10 space-y-8">
            <h1 className="text-center">Curriculum Vitae</h1>
            <div className="flex flex-row <md:flex-col-reverse">
                <div className="flex flex-col space-y-8">
                    <div className="flex flex-col space-y-2">
                        <h2 className="pb2">About Me</h2>
                        <p> I have been always, looking into the future, wanting to create new solutions using technology
                            to change how we live our everyday lives. My mission is to innovate, while also make my work
                            to be understood by others and be able to work together with people. Creativity, my pursuit
                            after my goals and my determination are my main attributes. I always try my best to
                            understand the needs of people I work with, and find a way for all parties to be happy.</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h2 className="pb-2">Skills</h2>
                        {
                            skillSets.map((skillSet) => {
                                return (
                                    <div>
                                        <h3>{skillSet.name}</h3>
                                        <ul className="flex flex-row space-x-2">
                                            {skillSet.skills.map((skill) => {
                                                return (
                                                    <li key={skill}>
                                                        <p>{skill}</p>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div>
                        <h2 className="pt-5 pb-2">Hobbies</h2>
                        <div className="flex flex-row space-x-2">
                            <p>Programming</p>
                            <p>Piano</p>
                            <p>Traveling</p>
                            <p>Photography</p>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <h2 className="pt-5 pb-2">Experience</h2>
                        {
                            experiences.map((experience) => {
                                return (
                                    <div>
                                        <h3>{experience.title}</h3>
                                        <p className="font-bold">{experience.endDate === "ongoing" && "Started in "}{experience?.startingDate && timestampToString(experience.startingDate, false, false)} {
                                            experience.endDate && (experience.endDate === "ongoing" ? "(ongoing)" : ("- " + timestampToString(experience.endDate, false, false)))
                                        }</p>
                                        <p className="whitespace-pre-wrap">{experience.description}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h2 className="pt-5 pb-2">Education</h2>
                        {
                            education.map(item => {
                                return (
                                    <div>
                                        <h3>{item.qualification}</h3>
                                        <h4>{item.place}</h4>
                                        <p>{item.startYear} - {item.endYear}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <Spacer />
                <div className="flex flex-col pb-4 flex-shrink-0 >md:self-start >md:sticky >md:top-16 <md:w-full items-center">
                    <img src="/images/me.jpg" className="w-48 object-contain" alt=""/>
                    <div className="w-full self-center">
                        <h4 className="text-center pt-2 <md:w-full <md:self-center">Daniel Richard Aboo</h4>
                        <h5 className="text-center pt-2 <md:w-full <md:self-center">Front-end Developer</h5>
                        <p className="w-full pt-2 <md:text-center">Mobile: <a href="tel:+48601951169">+48 601 951 169</a></p>
                        <p className="<md:text-center">Email: <a href="mailto:daboo1998@gmail.com">daboo1998@gmail.com</a></p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default MyCVPageLayout;