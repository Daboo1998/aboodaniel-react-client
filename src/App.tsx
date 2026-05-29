import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import NavigationProvider from "./components/context providers/NavigationProvider";
import NavBar from "./components/molecules/general/NavBar";
import SiteFooter from "./components/molecules/general/SiteFooter";
import { AppContainer } from "./App.styled";

// Page imports
import HomePageLayout from "./components/layouts/pages/general/HomePageLayout";
import MyCVPageLayout from "./components/layouts/pages/general/MyCVPageLayout";
import ContactPageLayout from "./components/layouts/pages/general/ContactPageLayout";
import NotFoundPageLayout from "./components/layouts/pages/general/NotFoundPageLayout";
import DevelopmentToolsPageLayout from "./components/layouts/pages/development and administration/DevelopmentToolsPageLayout";
import LoginPageLayout from "./components/layouts/pages/authentication/LoginPageLayout";
import RegisterPageLayout from "./components/layouts/pages/authentication/RegisterPageLayout";
import MessagesPageLayout from "./components/layouts/pages/development and administration/MessagesPageLayout";
import AskMeAnythingLayout from "./components/layouts/pages/general/AskMeAnything";

function App() {
  return (
    <BrowserRouter basename="/">
      <ThemeProvider>
        <NavigationProvider>
          <AppContainer>
            <NavBar />
            <Switch>
              <Route exact path="/">
                <HomePageLayout />
              </Route>
              <Route exact path="/home">
                <HomePageLayout />
              </Route>
              <Route exact path="/cv">
                <MyCVPageLayout />
              </Route>
              <Route exact path="/assistant">
                <AskMeAnythingLayout />
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
            <SiteFooter />
          </AppContainer>
        </NavigationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
