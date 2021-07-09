import React, {useEffect, useState} from "react";
import PageLayout from "../PageLayout";
import database, {timestampToString} from "../../../../data/database";
import Announcement from "../../../../data/Announcement";
import Spacer from "../../../atoms/utilities/Spacer";
import ReactMarkdown from "react-markdown";

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
            <div className="border-t border-black dark:border-white">
                {
                    announcements.map(announcement => {
                        return (
                            <div key={announcement.id} className="flex flex-col space-y-2 border-b border-black dark:border-white">
                                <div className="flex flex-row">
                                    <h2>{announcement.title}</h2>
                                    <Spacer />
                                    <p>{timestampToString(announcement.timestamp)}</p>
                                </div>
                                <ReactMarkdown className="whitespace-pre-wrap">{announcement.content}</ReactMarkdown>
                            </div>
                        );
                    })
                }
            </div>
        </PageLayout>
    );
};

export default AnnouncementsPageLayout;