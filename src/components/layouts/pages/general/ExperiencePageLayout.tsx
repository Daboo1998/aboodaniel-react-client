import React from "react";
import PageLayout from "../PageLayout";
import ExperienceModel from "../../../../data/experience";
import Experience from "../../../molecules/experience/Experience";
import {useAuth} from "../../../../contexts/AuthContext";
import AddExperiencePopup from "../../../molecules/popups/experience/AddExperiencePopup";
import usePopup from "../../../../hooks/usePopup";
import RemoveExperiencesPopup from "../../../molecules/popups/experience/RemoveExperiencesPopup";
import Button, {ButtonSize, ButtonType} from "../../../atoms/buttons and links/Button";
import useExperiences from "../../../../hooks/useExperiences";

export interface ExperiencePageLayoutProps {}

const ExperiencePageLayout: React.FC<ExperiencePageLayoutProps> = () => {
    const { experiences, areExperiencesLoading, addExperienceOffline, setExperiences } = useExperiences();
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
        addedExperience && addExperienceOffline(addedExperience);
        window.document.body.style.overflow = "unset";
    };

    const onRemoveExperiencesClose = (experiencesAfterRemove: ExperienceModel[]) => {
        setExperiences(experiencesAfterRemove);
        hideRemoveExperiencesPopup();
        window.document.body.style.overflow = "unset";
    };

    return (
        <PageLayout title="Experience" className="pt-10">
            <AddExperiencePopup isPopupShown={isAddExperiencePopupShown} onClose={onAddExperienceClose} />
            <RemoveExperiencesPopup experiences={experiences} onClose={onRemoveExperiencesClose} isPopupShown={isRemoveExperiencesPopupShown} />
            <div className="flex flex-row space-x-2">
                <div className="flex flex-col w-full space-y-2">
                    <h1>My experience</h1>
                    <div className="flex flex-row space-x-2 w-full">
                        {
                            auth.isOwner && <Button
                                className="flex-shrink-0"
                                size={ButtonSize.medium}
                                action={onAddButtonClick}
                                label="Add experience"
                                type={ButtonType.constructive}
                            />
                        }
                        {
                            auth.isOwner && <Button
                                className="flex-shrink-0"
                                size={ButtonSize.medium}
                                label="Remove experiences"
                                action={onRemoveButtonClick}
                                type={ButtonType.destructive}
                            />
                        }
                    </div>
                </div>
            </div>
            {
                areExperiencesLoading ? <p className="text-gray-600 text-center">Loading...</p> : (
                    <div className=" rounded-md border-black mt-4 mb-4">
                        {
                            experiences.sort((exp1, exp2) => (exp2.importance - exp1.importance)).map((exp) => {
                                return <Experience key={exp.title} experience={exp} />
                            })
                        }
                    </div>
                )
            }
        </PageLayout>
    );
};

export default ExperiencePageLayout;
