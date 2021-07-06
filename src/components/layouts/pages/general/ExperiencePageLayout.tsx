import React, {useEffect, useState} from "react";
import PageLayout, {PageLayoutProps} from "../PageLayout";
import ExperienceModel from "../../../../data/experience";
import Experience from "../../../molecules/experience/Experience";
import database from "../../../../data/database";
import {useAuth} from "../../../../contexts/AuthContext";
import AddExperiencePopup from "../../../molecules/popups/experience/AddExperiencePopup";
import usePopup from "../../../../hooks/usePopup";
import RemoveExperiencesPopup from "../../../molecules/popups/experience/RemoveExperiencesPopup";
import SubmitButton, {SubmitButtonType} from "../../../atoms/buttons and links/SubmitButton";

export interface ExperiencePageLayoutProps extends PageLayoutProps {}

const ExperiencePageLayout: React.FC<ExperiencePageLayoutProps> = () => {
    const [experiences, setExperiences] = useState<ExperienceModel[]>([]);
    const auth = useAuth();
    const [isAddExperiencePopupShown, showAddExperiencePopup, hideAddExperiencePopup] = usePopup();
    const [isRemoveExperiencesPopupShown, showRemoveExperiencesPopup, hideRemoveExperiencesPopup] = usePopup();

    const onAddButtonClick = () => {
        window.document.body.style.overflow = "hidden";
        showAddExperiencePopup();
    };

    const onRemoveButtonClick = () => {
        window.document.body.style.overflow = "hidden";
        showRemoveExperiencesPopup();
    };

    const onAddExperienceClose = (addedExperience?: ExperienceModel) => {
        hideAddExperiencePopup();
        addedExperience && setExperiences([...experiences, addedExperience]);
        window.document.body.style.overflow = "unset";
    };

    const onRemoveExperiencesClose = (experiences: ExperienceModel[]) => {
        setExperiences(experiences);
        hideRemoveExperiencesPopup();
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
            <AddExperiencePopup isPopupShown={isAddExperiencePopupShown} onClose={onAddExperienceClose} />
            <RemoveExperiencesPopup experiences={experiences} onClose={onRemoveExperiencesClose} isPopupShown={isRemoveExperiencesPopupShown} />
            <div className="flex flex-row space-x-2">
                <h1>My experience</h1>
                {
                    auth.isOwner && <SubmitButton
                        className="w-max flex-shrink-0"
                        onSubmit={onAddButtonClick}
                        label="Add experience"
                        type={SubmitButtonType.constructive}
                    />
                }
                {
                    auth.isOwner && <SubmitButton
                        className="w-max flex-shrink-0"
                        label="Remove experiences"
                        onSubmit={onRemoveButtonClick}
                        type={SubmitButtonType.destructive}
                    />
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
