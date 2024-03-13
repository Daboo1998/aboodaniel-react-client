import React, { useEffect } from "react";
import useNavigation from "../../../hooks/useNavigation";

import * as styled from "./PageLayout.styled";

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
    <styled.PageStyled {...props}>
      <div className={(className ?? "") + " w-full"}>{children}</div>
    </styled.PageStyled>
  );
};

export default PageLayout;
