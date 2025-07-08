import React from "react";
import PageLayout from "../PageLayout";
import { useLocation } from "react-router-dom";
import {
    ErrorCode,
    ErrorTitle,
    ErrorSubtitle,
    ErrorDescription
} from "./NotFoundPageLayout.styled";

const NotFoundPageLayout: React.FC = () => {
    const location = useLocation();

    return (
        <PageLayout title="404">
            <ErrorCode>404</ErrorCode>
            <ErrorTitle>
                Oops! You should not be here!
            </ErrorTitle>
            <ErrorSubtitle>
                Page "{location.pathname}" was not found!
            </ErrorSubtitle>
            <ErrorDescription>
                Please navigate to a different page using the navigator at the top of the page, or enter a valid url.
            </ErrorDescription>
        </PageLayout>
    );
};

export default NotFoundPageLayout;
