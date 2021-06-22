import React from 'react';
import HomePageLayout from "./components/layouts/HomePageLayout";
import ExperiencePageLayout from "./components/layouts/ExperiencePageLayout";
import PageNavigatorBar from "./components/molecules/navigator/PageNavigatorBar";
import PageNavigatorBarLink from "./components/atoms/PageNavigatorBarLink";
import Footer from "./components/molecules/Footer";
import NotFoundPageLayout from "./components/layouts/NotFoundPageLayout";
import Spacer from "./components/atoms/Spacer";
import DevelopmentToolsPageLayout from "./components/layouts/DevelopmentToolsPageLayout";
import {useAuth} from "./contexts/AuthContext";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
    const auth = useAuth();

    return (
        <BrowserRouter basename="/">
            <div className="flex flex-col h-screen">
                <PageNavigatorBar>
                    <PageNavigatorBarLink to="/" pageTitle="Home">
                        Home
                    </PageNavigatorBarLink>
                    <PageNavigatorBarLink to="/experience" pageTitle="Experience">
                        Experience
                    </PageNavigatorBarLink>
                    {
                        auth.isDeveloper && <PageNavigatorBarLink to="/developerTools" pageTitle="Developer Tools">
                            Developer Tools
                        </PageNavigatorBarLink>
                    }
                </PageNavigatorBar>
                <Switch>
                    <Route exact path="/">
                        <HomePageLayout />
                    </Route>
                    <Route exact path="/experience">
                        <ExperiencePageLayout />
                    </Route>
                    {
                        auth.isDeveloper && <Route exact path="/developerTools">
                            <DevelopmentToolsPageLayout />
                        </Route>
                    }
                    <Route>
                        <NotFoundPageLayout />
                    </Route>
                </Switch>
                <Spacer />
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
