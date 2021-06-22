import React from "react";
import PageLayout from "./PageLayout";
import firebase from "firebase";

const HomePageLayout: React.FC = () => {
    const firebaseApp = firebase.apps[0];
    return (
        <PageLayout className="pt-10">
            <h1>Welcome to my kingdom!</h1>
            <code>
                <pre>
                    {JSON.stringify(firebaseApp.options, null, 2)}
                </pre>
            </code>
        </PageLayout>
    );
};

export default HomePageLayout;
