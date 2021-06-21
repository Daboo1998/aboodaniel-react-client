import React, {useContext} from "react";
import {PageNavigatorContext} from "../pageNavigator/PageNavigator";

export interface PageLayoutProps extends React.HTMLProps<any> {
    path: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, path , className, ...props}) => {
    const { currentPath } = useContext(PageNavigatorContext);

    if (currentPath !== path) {
        return null;
    }

    return (
        <div className={"flex flex-col w-full p-10 bg-white pt-20"}  {...props}>
            <div className={(className ?? "") + " w-full"}>
                {children}
            </div>
        </div>
    );
};

export default PageLayout;