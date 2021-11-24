import React from "react";
import PageLayout from "../PageLayout";
import AnnouncementItem from "../../../molecules/announcements/AnnoucementItem";
import useAnnouncements from "../../../../hooks/useAnnouncements";

const AnnouncementsPageLayout: React.FC = () => {
    const {announcements, announcementsAreLoading} = useAnnouncements();

    return (
        <PageLayout title="Announcements" className="space-y-4">
            <h1>Announcements</h1>
            <div>
                {
                    announcementsAreLoading
                        ? <p className="text-gray-600 text-center">Loading...</p>
                        : announcements.map(announcement => {
                            return <AnnouncementItem announcement={announcement} key={announcement.id}/>;
                        })
                }
            </div>
        </PageLayout>
    );
};

export default AnnouncementsPageLayout;