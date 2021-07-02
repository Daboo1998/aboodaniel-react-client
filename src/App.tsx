import React, {useEffect} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Page imports
import HomePageLayout from "./components/layouts/pages/HomePageLayout";
import ExperiencePageLayout from "./components/layouts/pages/ExperiencePageLayout";
import ContactPageLayout from "./components/layouts/pages/ContactPageLayout";
import NotFoundPageLayout from "./components/layouts/pages/NotFoundPageLayout";
import DevelopmentToolsPageLayout from "./components/layouts/pages/DevelopmentToolsPageLayout";
import LoginPageLayout from "./components/layouts/pages/LoginPageLayout";
import RegisterPageLayout from "./components/layouts/pages/RegisterPageLayout";
import MessagesPageLayout from "./components/layouts/pages/MessagesPageLayout";

// Main elements imports
import PageNavigatorBar from "./components/molecules/navigator/PageNavigatorBar";
import PageNavigatorBarLink from "./components/atoms/PageNavigatorBarLink";
import Footer from "./components/molecules/Footer";

// utils imports
import Spacer from "./components/atoms/Spacer";

// Authentication
import {useAuth} from "./contexts/AuthContext";

function App() {
    const {isDeveloper, isOwner, user} = useAuth();

    useEffect(() => {
        user?.getIdToken().then(token => {
            console.log(`token: ${token}`);
        });
    }, [user]);

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
					<PageNavigatorBarLink to="/contact" pageTitle="Contact">
                  		Contact
              		</PageNavigatorBarLink>
                    {
                        isOwner && <PageNavigatorBarLink to="/messages" pageTitle="Messages">
                            Messages
                        </PageNavigatorBarLink>
                    }
                    {
                        isDeveloper && <PageNavigatorBarLink to="/developerTools" pageTitle="Developer Tools">
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
        </BrowserRouter>
    );
}

export default App;
