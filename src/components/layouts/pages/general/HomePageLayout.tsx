import React from "react";
import PageLayout from "../PageLayout";
import { WelcomeTitle, WelcomeText } from "./HomePageLayout.styled";

const HomePageLayout: React.FC = () => {
  return (
    <PageLayout title="Home">
      <WelcomeTitle>
        Hello and welcome!
      </WelcomeTitle>
      <WelcomeText>
        I'm building a new experience, which will take time. After experience I
        have gained and am still gaining, I can do better and will do better.
        Please feel free to explore this website, but in the future it will be,
        well... better :) You can also ask my (virtual) assistant about anything
        in My Assistant tab, just note its in Beta :)
      </WelcomeText>
    </PageLayout>
  );
};

export default HomePageLayout;
