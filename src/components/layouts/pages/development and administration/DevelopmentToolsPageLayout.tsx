import React, {useEffect} from "react";
import {useAuth} from "../../../../contexts/AuthContext";
import DevelopmentTools from "../../../molecules/developer tools/DevelopmentTools";
import useNavigation from "../../../../hooks/useNavigation";
import PortfolioFooter from "../../../molecules/general/PortfolioFooter";
import {
    UnauthorizedContainer,
    UnauthorizedTitle,
    UnauthorizedMessage
} from "./DevelopmentToolsPageLayout.styled";

export interface DevelopmentToolsPageLayoutProps {}

const DevelopmentToolsPageLayout: React.FC<DevelopmentToolsPageLayoutProps> = () => {
    const {isLoggedIn, isDeveloper} = useAuth();
    const {goToLogin} = useNavigation();

    useEffect(() => {
        document.title = "Daniel Aboo — Developer Tools";
    }, []);

    if (isLoggedIn !== undefined && !isLoggedIn) {
        goToLogin("/developerTools");
    }

    return (
        <>
            {isLoggedIn && (isDeveloper ? (
                <DevelopmentTools />
            ) : (
                <UnauthorizedContainer>
                    <span className="kicker reveal in"><span className="idx">✦</span> — Admin Panel</span>
                    <UnauthorizedTitle className="reveal in" data-delay="1">Restricted area</UnauthorizedTitle>
                    <UnauthorizedMessage className="reveal in" data-delay="2">
                        You are not a developer — it's dangerous here! Contact the administrator if you need access.
                    </UnauthorizedMessage>
                </UnauthorizedContainer>
            ))}
            <PortfolioFooter variant="minimal" />
        </>
    );
};

export default DevelopmentToolsPageLayout;
