import React from 'react';
import PageNavigator from "./components/pageNavigator/PageNavigator";
import HomePageLayout from "./components/layouts/HomePageLayout";
import ExperiencePageLayout from "./components/layouts/ExperiencePageLayout";
import PageNavigatorBar from "./components/molecules/navigator/PageNavigatorBar";
import PageNavigatorBarLink from "./components/atoms/PageNavigatorBarLink";
import Footer from "./components/molecules/Footer";
import NotFoundPageLayout from "./components/layouts/NotFoundPageLayout";
import Spacer from "./components/atoms/Spacer";

function App() {
    return (
      <PageNavigator>
          <PageNavigatorBar>
              <PageNavigatorBarLink to="/" pageTitle="Home">
                  Home
              </PageNavigatorBarLink>
              <PageNavigatorBarLink to="/experience" pageTitle="Experience">
                  Experience
              </PageNavigatorBarLink>
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
