import React, {useEffect} from "react";
import PageLayout, {PageLayoutProps} from "./PageLayout";
import {useAuth} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import firebase from "firebase";

export interface DevelopmentToolsPageLayoutProps extends PageLayoutProps {}

const DevelopmentToolsPageLayout: React.FC<DevelopmentToolsPageLayoutProps> = () => {
    const {wentToLogin, isLoggedIn} = useAuth();
    const history = useHistory();

    if (isLoggedIn !== undefined && !isLoggedIn) {
        history.push("/login");
        wentToLogin("/developerTools");
    }

    return (
        <PageLayout>
            {isLoggedIn && <h1>Development Tools</h1>}
        </PageLayout>
    );
};

export default DevelopmentToolsPageLayout;