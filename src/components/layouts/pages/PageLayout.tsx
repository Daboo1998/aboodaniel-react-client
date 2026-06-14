import React, { useEffect } from "react";
import useNavigation from "../../../hooks/useNavigation";
import { PageStyled, ContentWrapper } from "./PageLayout.styled";

export interface PageLayoutProps extends React.HTMLProps<any> {
  title: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className,
  title,
  ...props
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setCurrentPageTitle(title);
  });

  return (
    <PageStyled {...props} className={className}>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </PageStyled>
  );
};

export default PageLayout;
