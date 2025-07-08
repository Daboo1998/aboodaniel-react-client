import React, {useEffect, useState} from "react";
import PageLayout from "../PageLayout";
import ExperienceModel from "../../../../data/experience";
import Experience from "../../../molecules/experience/Experience";
import database from "../../../../data/database";
import {useAuth} from "../../../../contexts/AuthContext";
import AddExperiencePopup from "../../../molecules/popups/experience/AddExperiencePopup";
import usePopup from "../../../../hooks/usePopup";
import RemoveExperiencesPopup from "../../../molecules/popups/experience/RemoveExperiencesPopup";
import Button, {ButtonSize, ButtonType} from "../../../atoms/buttons and links/Button";
import {
    ExperienceContainer,
    HeaderContainer,
    ContentContainer,
    ExperienceTitle,
    ButtonsContainer,
    ActionButton,
    ExperiencesContainer
} from "./ExperiencePageLayout.styled";

export interface ExperiencePageLayoutProps {}

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
        <PageLayout title="Experience">
            <ExperienceContainer>
                <AddExperiencePopup isPopupShown={isAddExperiencePopupShown} onClose={onAddExperienceClose} />
                <RemoveExperiencesPopup experiences={experiences} onClose={onRemoveExperiencesClose} isPopupShown={isRemoveExperiencesPopupShown} />
                <HeaderContainer>
                    <ContentContainer>
                        <ExperienceTitle>My experience</ExperienceTitle>
                        <ButtonsContainer>
                            {auth.isOwner && (
                                <ActionButton>
                                    <Button
                                        size={ButtonSize.medium}
                                        action={onAddButtonClick}
                                        label="Add experience"
                                        type={ButtonType.constructive}
                                    />
                                </ActionButton>
                            )}
                            {auth.isOwner && (
                                <ActionButton>
                                    <Button
                                        size={ButtonSize.medium}
                                        label="Remove experiences"
                                        action={onRemoveButtonClick}
                                        type={ButtonType.destructive}
                                    />
                                </ActionButton>
                            )}
                        </ButtonsContainer>
                    </ContentContainer>
                </HeaderContainer>
                <ExperiencesContainer>
                    {
                        experiences.sort((exp1, exp2) => (exp2.importance - exp1.importance)).map((exp) => {
                            return <Experience key={exp.title} experience={exp} />
                        })
                    }
                </ExperiencesContainer>
            </ExperienceContainer>
        </PageLayout>
    );
};

export default ExperiencePageLayout;
