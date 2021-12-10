import React from 'react';

import HomePageLayout from "./components/layouts/pages/general/HomePageLayout";
import ExperiencePageLayout from "./components/layouts/pages/general/ExperiencePageLayout";
import ContactPageLayout from "./components/layouts/pages/general/ContactPageLayout";
import DevelopmentToolsPageLayout from "./components/layouts/pages/development and administration/DevelopmentToolsPageLayout";
import LoginPageLayout from "./components/layouts/pages/authentication/LoginPageLayout";
import RegisterPageLayout from "./components/layouts/pages/authentication/RegisterPageLayout";
import MessagesPageLayout from "./components/layouts/pages/development and administration/MessagesPageLayout";
import MyCVPageLayout from "./components/layouts/pages/general/MyCVPageLayout";

export interface Route {
    path: string;
    page: () => React.FC;
}

const routes: Route[] = [
    {
        path: "/",
        page: () => <HomePageLayout />
    },
    {
        path: "/experience",
        page: () => <ExperiencePageLayout />
    },
    {
        path: "/cv",
        page: () => <MyCVPageLayout />
    },
    {
        path: "/contact",
        page: () => <ContactPageLayout />
    },
    {
        path: "/developerTools",
        page: () => <DevelopmentToolsPageLayout />
    },
    {
        path: "/messages",
        page: () => <MessagesPageLayout />
    },
    {
        path: "/login",
        page: () => <LoginPageLayout />
    },
    {
        path: "/register",
        page: () => <RegisterPageLayout />
    }
];

export default routes;