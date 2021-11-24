import {useState, useEffect} from 'react';
import Announcement from "../data/Announcement";
import database from "../data/database";

const useAnnouncements = () => {
    const [announcements, setAnnouncements] = useState<Announcement []>([]);
    const [announcementsAreLoading, setAnnouncementsAreLoading] = useState(false);
    const [announcementsError, setAnnouncementsError] = useState<Error>();

    const reloadAnnouncements = () => {
        setAnnouncementsAreLoading(true);
        setAnnouncementsError(undefined);
        database.announcements
            .getAll({field: "timestamp", direction: "desc"})
            .then(response => {
                setAnnouncements(response);
            })
            .catch(setAnnouncementsError)
            .finally(() => setAnnouncementsAreLoading(false));
    };

    useEffect(reloadAnnouncements, []);

    return {announcements, announcementsAreLoading, announcementsError};
};

export default useAnnouncements;