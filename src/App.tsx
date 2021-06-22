import React from 'react';
import HomePageLayout from "./components/layouts/HomePageLayout";
import ExperiencePageLayout from "./components/layouts/ExperiencePageLayout";
import PageNavigatorBar from "./components/molecules/navigator/PageNavigatorBar";
import PageNavigatorBarLink from "./components/atoms/PageNavigatorBarLink";
import Footer from "./components/molecules/Footer";
import NotFoundPageLayout from "./components/layouts/NotFoundPageLayout";
import Spacer from "./components/atoms/Spacer";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
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
                </PageNavigatorBar>
                <Switch>
                    <Route exact path="/">
                        <HomePageLayout />
                    </Route>
                    <Route exact path="/experience">
                        <ExperiencePageLayout />
                    </Route>
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
