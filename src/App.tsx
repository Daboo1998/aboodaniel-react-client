import React from 'react';
import PageNavigator from "./components/pageNavigator/PageNavigator";
import HomePageLayout from "./components/layouts/pages/HomePageLayout";
import ExperiencePageLayout from "./components/layouts/pages/ExperiencePageLayout";
import ContactPageLayout from "./components/layouts/pages/ContactPageLayout";
import PageNavigatorBar from "./components/molecules/navigator/PageNavigatorBar";
import PageNavigatorBarLink from "./components/atoms/PageNavigatorBarLink";
import Footer from "./components/molecules/Footer";
import NotFoundPageLayout from "./components/layouts/pages/NotFoundPageLayout";
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
              <PageNavigatorBarLink to="/contact" pageTitle="Contact">
                  Contact
              </PageNavigatorBarLink>
          </PageNavigatorBar>

          <HomePageLayout path="/" />
          <ExperiencePageLayout path="/experience" />
          <ContactPageLayout path="/contact" />
          <NotFoundPageLayout />

          <Spacer />
          <Footer />
      </PageNavigator>
    );
}

export default App;
