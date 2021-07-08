import React from "react";
import PageLayout from "../PageLayout";
import {useAuth} from "../../../../contexts/AuthContext";
import DevelopmentTools from "../../../molecules/developer tools/DevelopmentTools";
import useNavigation from "../../../../hooks/useNavigation";

export interface DevelopmentToolsPageLayoutProps {}

const DevelopmentToolsPageLayout: React.FC<DevelopmentToolsPageLayoutProps> = () => {
    const {isLoggedIn, isDeveloper} = useAuth();
    const {goToLogin} = useNavigation();

    if (isLoggedIn !== undefined && !isLoggedIn) {
        goToLogin("/developerTools");
    }

    return (
        <PageLayout title="Developer Tools">
            {isLoggedIn && (isDeveloper ? <DevelopmentTools /> : <h1>You are not a developer! Its dangerous here!</h1>)}
        </PageLayout>
    );
};

export default DevelopmentToolsPageLayout;