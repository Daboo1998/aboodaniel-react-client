import React, {useEffect, useState} from "react";
import PageLayout, {PageLayoutProps} from "../PageLayout";
import ExperienceModel from "../../../data/experience";
import Experience from "../../molecules/experience/Experience";
import database from "../../../data/database";

export interface ExperiencePageLayoutProps extends PageLayoutProps {}

const ExperiencePageLayout: React.FC<ExperiencePageLayoutProps> = () => {
    const [experiences, setExperiences] = useState<ExperienceModel[]>([]);

    useEffect(() => {
        setExperiences([]);
        database.experiences.getAll().then(results => {
            setExperiences(results)
        }).catch(error => {
            console.log("Could not get list of experiences: " + error.message);
        });
    }, []);

    return (
        <PageLayout className="pt-10">
            <h1 className="text-gray-500 font-bold w-full pl-4">My experience</h1>
            <div className=" rounded-md border-black mt-4 mb-4 p-2">
                {
                    experiences.sort((exp1, exp2) => (exp2.importance - exp1.importance)).map((exp) => {
                        return <Experience key={exp.title} experience={exp} />
                    })
                }
            </div>
        </PageLayout>
    );
};

export default ExperiencePageLayout;
