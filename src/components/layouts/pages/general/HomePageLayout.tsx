import React from "react";
import PageLayout from "../PageLayout";

const HomePageLayout: React.FC = () => {
  return (
    <PageLayout title="Home" className="py-10">
      <h1
        className="text-center pb-20"
        style={{ fontSize: "50px", lineHeight: "60px" }}
      >
        Hello and welcome!
      </h1>
      <p className="text-center px-20">
        I'm building a new experience, which will take time. After experience I
        have gained and am still gaining, I can do better and will do better.
        Please feel free to explore this old website, but in the future it will
        be, well... better :)
      </p>
    </PageLayout>
  );
};

export default HomePageLayout;
