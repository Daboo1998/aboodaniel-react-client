import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Page imports
import NewHomePageLayout from "./components/layouts/pages/general/NewHomePageLayout";
import MaintenancePageLayout from "./components/layouts/pages/general/MaintenancePageLayout";
import ExperiencePageLayout from "./components/layouts/pages/general/ExperiencePageLayout";
import ContactPageLayout from "./components/layouts/pages/general/ContactPageLayout";
import NotFoundPageLayout from "./components/layouts/pages/general/NotFoundPageLayout";
import DevelopmentToolsPageLayout from "./components/layouts/pages/development and administration/DevelopmentToolsPageLayout";
import LoginPageLayout from "./components/layouts/pages/authentication/LoginPageLayout";
import RegisterPageLayout from "./components/layouts/pages/authentication/RegisterPageLayout";
import MessagesPageLayout from "./components/layouts/pages/development and administration/MessagesPageLayout";
import AskMeAnythingLayout from "./components/layouts/pages/general/AskMeAnything";

// Main elements imports
import PageNavigatorBar from "./components/molecules/general/PageNavigatorBar";
import PageNavigatorBarLink from "./components/atoms/buttons and links/PageNavigatorBarLink";
import Footer from "./components/molecules/general/Footer";
import SkipLink from "./components/atoms/utilities/SkipLink";

// Hooks
import useFocusOnRouteChange from "./hooks/useFocusOnRouteChange";

import MyCVPageLayout from "./components/layouts/pages/general/MyCVPageLayout";
import NavigationProvider from "./components/context providers/NavigationProvider";
import { AppContainer, AppContent } from "./App.styled";

function AppWithRouter() {
  // Maintenance flag - set to true to show maintenance page instead of old home page
  const MAINTENANCE_MODE = process.env.REACT_APP_MAINTENANCE_MODE === "true";
  
  // Handle focus management on route changes
  useFocusOnRouteChange();

  return (
    <NavigationProvider>
      <AppContainer>
        <SkipLink />
        <PageNavigatorBar>
          <PageNavigatorBarLink to="/">Home</PageNavigatorBarLink>
          {/* <PageNavigatorBarLink to="/experience">
                  Experience
              </PageNavigatorBarLink> */}
          <PageNavigatorBarLink to="/assistant">
            My Assistant (Beta)
          </PageNavigatorBarLink>
          <PageNavigatorBarLink to="/contact">Contact</PageNavigatorBarLink>
        </PageNavigatorBar>
        <AppContent as="main" id="main-content" tabIndex={-1}>
          <Switch>
            <Route exact path="/">
              <NewHomePageLayout />
            </Route>
            <Route exact path="/home">
              <NewHomePageLayout />
            </Route>
            <Route exact path="/maintenance">
              <MaintenancePageLayout showMaintenance={MAINTENANCE_MODE} />
            </Route>
            <Route exact path="/experience">
              <ExperiencePageLayout />
            </Route>
            <Route exact path="/cv">
              <MyCVPageLayout />
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
            <Route exact path="/assistant">
              <AskMeAnythingLayout />
            </Route>
            <Route exact path="/contact">
              <ContactPageLayout />
            </Route>
            <Route>
              <NotFoundPageLayout />
            </Route>
          </Switch>
        </AppContent>
        <Footer isInsideMenu={false} />
      </AppContainer>
    </NavigationProvider>
  );
}

function App() {
  return (
    <BrowserRouter basename="/">
      <AppWithRouter />
    </BrowserRouter>
  );
}

export default App;
