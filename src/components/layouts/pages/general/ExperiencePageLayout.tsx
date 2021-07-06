import React, {useEffect, useState} from "react";
import PageLayout, {PageLayoutProps} from "../PageLayout";
import ExperienceModel from "../../../../data/experience";
import Experience from "../../../molecules/experience/Experience";
import database from "../../../../data/database";
import {useAuth} from "../../../../contexts/AuthContext";
import AddButton from "../../../atoms/buttons and links/AddButton";
import AddExperiencePopup from "../../../molecules/popups/experience/AddExperiencePopup";
import usePopup from "../../../../hooks/usePopup";

export interface ExperiencePageLayoutProps extends PageLayoutProps {}

const ExperiencePageLayout: React.FC<ExperiencePageLayoutProps> = () => {
    const [experiences, setExperiences] = useState<ExperienceModel[]>([]);
    const auth = useAuth();
    const [isPopupShown, showPopup, hidePopup] = usePopup();

    const onAddButtonClick = () => {
        window.document.body.style.overflow = "hidden";
        showPopup();
    };

    const onAddExperienceClose = () => {
        hidePopup();
        window.document.body.style.overflow = "unset";
    };

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
            <AddExperiencePopup isPopupShown={isPopupShown} onClose={onAddExperienceClose} />
            <div className="flex flex-row">
                <h1>My experience</h1>
                {
                    auth.isOwner && <AddButton onClick={onAddButtonClick} text="Add experience" />
                }
            </div>
            <div className=" rounded-md border-black mt-4 mb-4">
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
