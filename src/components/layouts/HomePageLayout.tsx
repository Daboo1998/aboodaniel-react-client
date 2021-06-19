import React from "react";
import PageLayout, {PageLayoutProps} from "./PageLayout";

interface HomePageLayoutProps extends PageLayoutProps {}

const HomePageLayout: React.FC<HomePageLayoutProps> = ({ path }) => {
    return (
        <PageLayout path={path} className="pt-10">
            <h1>Welcome to my kingdom!</h1>
        </PageLayout>
    );
};

export default HomePageLayout;