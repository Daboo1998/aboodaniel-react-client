import React from 'react';
import PageNavigator from "./components/pageNavigator/PageNavigator";
import HomePageLayout from "./components/layouts/HomePageLayout";
import ExperiencePageLayout from "./components/layouts/ExperiencePageLayout";
import PageNavigatorBar from "./components/molecules/navigator/PageNavigatorBar";
import NavigationBarLink from "./components/atoms/NavigationBarLink";
import Footer from "./components/molecules/Footer";
import NotFoundPageLayout from "./components/layouts/NotFoundPageLayout";
import Spacer from "./components/atoms/Spacer";

function App() {
    return (
      <PageNavigator>
          <PageNavigatorBar>
              <NavigationBarLink to="/" pageTitle="Home">
                  Home
              </NavigationBarLink>
              <NavigationBarLink to="/experience" pageTitle="Experience">
                  Experience
              </NavigationBarLink>
          </PageNavigatorBar>

          <HomePageLayout path="/" />
          <ExperiencePageLayout path="/experience" />
          <NotFoundPageLayout />

          <Spacer />
          <Footer />
      </PageNavigator>
    );
}

export default App;
