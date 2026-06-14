import React from "react";
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

  return (
    <MaintenanceContainer>
      <MaintenanceMessage>
        <h1>🔧 Maintenance Page</h1>
        <p>This page is currently disabled.</p>
        <p>Please use the main navigation to access other parts of the website.</p>
      </MaintenanceMessage>
    </MaintenanceContainer>
  );
};

export default MaintenancePageLayout;