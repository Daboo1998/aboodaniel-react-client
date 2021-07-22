import {useCallback, useEffect, useState} from "react";
import database from "../data/database";
import Experience from "../data/experience";

const useExperiences = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [areExperiencesLoading, setAreExperiencesLoading] = useState(false);

    const addExperienceOffline = (experience: Experience) => {
        setExperiences([...experiences, experience]);
    };

    useEffect(() => {
        setAreExperiencesLoading(true);
        database.experiences.getAll().then(results => {
            setExperiences(results)
        }).catch(error => {
            console.log("Could not get list of experiences: " + error.message);
        }).finally(() => {
            setAreExperiencesLoading(false);
        });
    }, []);

    return { experiences, areExperiencesLoading, addExperienceOffline, setExperiences }
};

export const useAddExperience = (onAdded: (experience: Experience) => void) => {
    const [isAddingExperience, setIsAddingExperience] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const callOnAdded = useCallback(onAdded, [onAdded]);

    const addExperience = useCallback((newExperience: Experience) => {
        setIsAddingExperience(true);
        database.experiences.post(newExperience).then(() => {
            callOnAdded(newExperience);
        }).catch(error => {
            setErrorMessage(error.message);
        }).finally(() => {
            setIsAddingExperience(false);
        })
    }, [callOnAdded]);

    return { addExperience, isAddingExperience, errorMessage, setErrorMessage }
};

export const useRemoveExperiences = (onRemoved: (experiencesAfterDelete: Experience[]) => void) => {
    const [selectedExperienceIds, setSelectedExperienceIds] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const toggleExperience = useCallback((experience: Experience, isSelected: boolean) => {
        if (!experience.id) return;

        isSelected ? setSelectedExperienceIds([...selectedExperienceIds, experience.id]): (
            setSelectedExperienceIds(selectedExperienceIds.filter(experienceId => experienceId !== experience.id))
        )
    }, [selectedExperienceIds]);

    const removeSelectedExperiences = (experiencesBeforeRemove: Experience []) => {
        database.experiences
            .deleteMany(selectedExperienceIds)
            .then(() => {
                onRemoved(
                    experiencesBeforeRemove.filter(
                        experience => experience.id && !selectedExperienceIds.includes(experience.id)
                    )
                );
            }).catch(error => {
            setErrorMessage(error.message);
        });
    };

    return {removeSelectedExperiences, toggleExperience, errorMessage}
};

export default useExperiences;