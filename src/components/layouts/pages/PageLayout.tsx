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

  // Check if className contains padding classes to determine if we should apply custom padding
  const hasCustomPadding = className?.includes('p-') || className?.includes('pt-') || className?.includes('pb-') || className?.includes('px-') || className?.includes('py-');

  return (
    <PageStyled {...props}>
      <ContentWrapper $hasCustomPadding={hasCustomPadding && !className?.includes('p-6')}>
        {children}
      </ContentWrapper>
    </PageStyled>
  );
};

export default PageLayout;
