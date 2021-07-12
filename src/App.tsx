import React, {useEffect} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Page imports
import HomePageLayout from "./components/layouts/pages/general/HomePageLayout";
import ExperiencePageLayout from "./components/layouts/pages/general/ExperiencePageLayout";
import ContactPageLayout from "./components/layouts/pages/general/ContactPageLayout";
import NotFoundPageLayout from "./components/layouts/pages/general/NotFoundPageLayout";
import DevelopmentToolsPageLayout from "./components/layouts/pages/development and administration/DevelopmentToolsPageLayout";
import LoginPageLayout from "./components/layouts/pages/authentication/LoginPageLayout";
import RegisterPageLayout from "./components/layouts/pages/authentication/RegisterPageLayout";
import MessagesPageLayout from "./components/layouts/pages/development and administration/MessagesPageLayout";

// Main elements imports
import PageNavigatorBar from "./components/molecules/general/PageNavigatorBar";
import PageNavigatorBarLink from "./components/atoms/buttons and links/PageNavigatorBarLink";
import Footer from "./components/molecules/general/Footer";

// utils imports
import Spacer from "./components/atoms/utilities/Spacer";

// Authentication
import {useAuth} from "./contexts/AuthContext";
import MyCVPageLayout from "./components/layouts/pages/general/MyCVPageLayout";
import NavigationProvider from "./components/context providers/NavigationProvider";

function App() {
    const {user} = useAuth();

    useEffect(() => {
        user?.getIdToken().then(token => {
            console.log(`token: ${token}`);
        });
    }, [user]);

    return (
        <BrowserRouter basename="/">
            <NavigationProvider>
                <div className="flex flex-col h-screen">
                    <PageNavigatorBar>
                        <PageNavigatorBarLink to="/">
                            Home
                        </PageNavigatorBarLink>
                        <PageNavigatorBarLink to="/experience">
                            Experience
                        </PageNavigatorBarLink>
                        <PageNavigatorBarLink to="/contact">
                            Contact
                        </PageNavigatorBarLink>
                    </PageNavigatorBar>
                    <Switch>
                        <Route exact path="/">
                            <HomePageLayout />
                        </Route>
                        <Route exact path="/experience">
                            <ExperiencePageLayout />
                        </Route>
                        <Route exact path="/cv">
                            <MyCVPageLayout />
                        </Route>
                        <Route exact path="/contact">
                            <ContactPageLayout />
                        </Route>
                        <Route exact path="/developerTools">
                            <DevelopmentToolsPageLayout />
                        </Route>
                        <Route exact path="/messages">
                            <MessagesPageLayout />
                        </Route>
                        <Route exact path="/login">
                            <LoginPageLayout />
                        </Route>
                        <Route exact path="/register">
                            <RegisterPageLayout />
                        </Route>
                        <Route>
                            <NotFoundPageLayout />
                        </Route>
                    </Switch>
                    <Spacer />
                    <Footer />
                </div>
            </NavigationProvider>
        </BrowserRouter>
    );
}

export default App;
