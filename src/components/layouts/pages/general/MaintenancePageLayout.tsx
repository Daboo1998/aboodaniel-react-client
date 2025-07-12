import React from "react";
import HomePageLayout from "./HomePageLayout";
import { MaintenanceContainer, MaintenanceMessage } from "./MaintenancePageLayout.styled";

interface MaintenancePageLayoutProps {
  showMaintenance?: boolean;
}

const MaintenancePageLayout: React.FC<MaintenancePageLayoutProps> = ({ 
  showMaintenance = false 
}) => {
  if (showMaintenance) {
    return (
      <MaintenanceContainer>
        <MaintenanceMessage>
          <h1>🛠️ Under Maintenance</h1>
          <p>We're currently updating our website. Please check back soon!</p>
          <p>For urgent matters, please contact us directly.</p>
        </MaintenanceMessage>
      </MaintenanceContainer>
    );
  }

  return <HomePageLayout />;
};

export default MaintenancePageLayout;