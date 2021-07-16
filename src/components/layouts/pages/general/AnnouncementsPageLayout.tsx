import React, {useEffect, useState} from "react";
import PageLayout from "../PageLayout";
import database from "../../../../data/database";
import Announcement from "../../../../data/Announcement";
import AnnouncementItem from "../../../molecules/announcements/AnnoucementItem";

const AnnouncementsPageLayout: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement []>([]);

    useEffect(() => {
        database.announcements
            .getAll({field: "timestamp", direction: "desc"})
            .then(response => {
                setAnnouncements(response);
            })
    }, []);

    return (
        <PageLayout title="Announcements" className="space-y-4">
            <h1>Announcements</h1>
            <div>
                {
                    announcements.map(announcement => {
                        return <AnnouncementItem announcement={announcement} key={announcement.id}/>;
                    })
                }
            </div>
        </PageLayout>
    );
};

export default AnnouncementsPageLayout;