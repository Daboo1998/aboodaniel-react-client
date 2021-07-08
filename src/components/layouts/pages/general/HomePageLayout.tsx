import React from "react";
import PageLayout from "../PageLayout";

const HomePageLayout: React.FC = () => {
    return (
        <PageLayout title="Home" className="pt-10">
            <h1 className="text-center">Welcome to my kingdom!</h1>
            <div className="p-8">
                <img src="/images/me.jpg" className="w-48 float-left pr-4 pb-4" alt=""/>
                <p className="text-xl">A bit about me. I have been always, looking into the future, wanting to create
                    new solutions using technology to change how we live our everyday lives. My mission is to innovate,
                    while also make my work to be understood by others and be able to work together with people.
                    Creativity, my pursuit after my goals and my determination are my main attributes. I always try my
                    best to understand the needs of people I work with, and find a way for all parties to be happy. Btw,
                    I've built this website from scratch ;) </p>
            </div>
        </PageLayout>
    );
};

export default HomePageLayout;
