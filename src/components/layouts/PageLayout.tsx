import React from "react";

export interface PageLayoutProps extends React.HTMLProps<any> {}

const PageLayout: React.FC<PageLayoutProps> = (
    {
        children ,
        className,
        ...props
    }
) => {
    return (
        <div className={"flex flex-col w-full p-10 bg-white"}  {...props}>
            <div className={(className ?? "") + " w-full"}>
                {children}
            </div>
        </div>
    );
};

export default PageLayout;