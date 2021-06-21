import React from "react";
import PageLayout, {PageLayoutProps} from "./PageLayout";

export interface DevelopmentToolsPageLayoutProps extends PageLayoutProps {}

const DevelopmentToolsPageLayout: React.FC<DevelopmentToolsPageLayoutProps> = ({path}) => {

    return (
        <PageLayout path={path}>
            <h1>Development Tools</h1>
        </PageLayout>
    );
};

export default DevelopmentToolsPageLayout;