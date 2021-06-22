import React from "react";
import PageLayout, {PageLayoutProps} from "./PageLayout";
import experience from "../../data/experience";
import Experience from "../molecules/experience/Experience";

export interface ExperiencePageLayoutProps extends PageLayoutProps {}

const ExperiencePageLayout: React.FC<ExperiencePageLayoutProps> = () => {
    return (
        <PageLayout className="pt-10">
            <h1 className="text-gray-500 font-bold w-full pl-4">My experience</h1>
            <div className=" rounded-md border-black mt-4 mb-4 p-2">
                {
                    experience.map((exp) => {
                        return <Experience experience={exp} />
                    })
                }
            </div>
        </PageLayout>
    );
};

export default ExperiencePageLayout;
