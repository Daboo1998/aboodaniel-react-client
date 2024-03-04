import React, { useEffect } from "react";
import useNavigation from "../../../hooks/useNavigation";

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
    <div
      className={
        "flex flex-col w-full p-10 bg-background-light dark:bg-background-dark pt-20"
      }
      {...props}
    >
      <div className={(className ?? "") + " w-full"}>{children}</div>
    </div>
  );
};

export default PageLayout;
