import React from "react";
import PageLayout, {PageLayoutProps} from "./PageLayout";
import {useAuth} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";

export interface DevelopmentToolsPageLayoutProps extends PageLayoutProps {}

const DevelopmentToolsPageLayout: React.FC<DevelopmentToolsPageLayoutProps> = () => {
    const {isDeveloper, wentToLogin} = useAuth();
    const history = useHistory();

    if (!isDeveloper) {
        history.push("/login");
        wentToLogin("/developerTools");
    }

    return (
        <PageLayout>
            {isDeveloper ? <h1>Development Tools</h1> : <h1>You have to log in!</h1>}
        </PageLayout>
    );
};

export default DevelopmentToolsPageLayout;