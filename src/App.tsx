import React, {useEffect} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// routes
import routes from './Routes';

// Page imports
import NotFoundPageLayout from "./components/layouts/pages/general/NotFoundPageLayout";

// Main elements imports
import PageNavigatorBar from "./components/molecules/general/PageNavigatorBar";
import PageNavigatorBarLink from "./components/atoms/buttons and links/PageNavigatorBarLink";
import Footer from "./components/molecules/general/Footer";

// utils imports
import Spacer from "./components/atoms/utilities/Spacer";

// Authentication
import {useAuth} from "./contexts/AuthContext";
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
                        {routes.map(route => (
                            <Route exact path={route.path}>
                                {route.page()}
                            </Route>
                        ))}
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
