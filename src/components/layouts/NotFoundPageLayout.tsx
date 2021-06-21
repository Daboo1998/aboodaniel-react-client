import React, {useContext} from "react";
import PageLayout from "./PageLayout";
import {PageNavigatorContext} from "../pageNavigator/PageNavigator";

const NotFoundPageLayout: React.FC = () => {
    const {paths, currentPath} = useContext(PageNavigatorContext);

    if (paths.includes(currentPath)) {
        return null;
    }

    return (<PageLayout path={currentPath}>
        <div className="text-center text-9xl font-bold text-gray-500 p-4">404</div>
        <h1 className="font-bold">
            Oops! You should not be here!
        </h1>
        <h2>
            Page "{currentPath}" was not found!
        </h2>
        <p>
            Please navigate to a different page using the navigator at the top of the page, or enter a valid url.
        </p>
    </PageLayout>);
};

export default NotFoundPageLayout;