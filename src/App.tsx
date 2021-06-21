import React from 'react';
import PageNavigator from "./components/pageNavigator/PageNavigator";
import HomePageLayout from "./components/layouts/pages/HomePageLayout";
import ExperiencePageLayout from "./components/layouts/pages/ExperiencePageLayout";
import ContactPageLayout from "./components/layouts/pages/ContactPageLayout";
import PageNavigatorBar from "./components/molecules/navigator/PageNavigatorBar";
import NavigationBarLink from "./components/atoms/NavigationBarLink";
import Footer from "./components/molecules/Footer";
import NotFoundPageLayout from "./components/layouts/pages/NotFoundPageLayout";
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
              <NavigationBarLink to="/contact" pageTitle="Contact">
                  Contact
              </NavigationBarLink>
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
