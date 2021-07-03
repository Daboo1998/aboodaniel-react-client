import React from "react";
import PageLayout, {PageLayoutProps} from "../PageLayout";
import {useAuth} from "../../../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import DevelopmentTools from "../../../molecules/developer tools/DevelopmentTools";

export interface DevelopmentToolsPageLayoutProps extends PageLayoutProps {}

const DevelopmentToolsPageLayout: React.FC<DevelopmentToolsPageLayoutProps> = () => {
    const {wentToLogin, isLoggedIn, isDeveloper} = useAuth();
    const history = useHistory();

    if (isLoggedIn !== undefined && !isLoggedIn) {
        history.push("/login");
        wentToLogin("/developerTools");
    }

    return (
        <PageLayout>
            {isLoggedIn && (isDeveloper ? <DevelopmentTools /> : <h1>You are not a developer! Its dangerous here!</h1>)}
        </PageLayout>
    );
};

export default DevelopmentToolsPageLayout;