import React, {useLayoutEffect, useState } from "react";
import { createBrowserHistory, Location } from 'history';

export const history = createBrowserHistory();

export const PageNavigatorContext = React.createContext({
    currentPath: "/",
    addPath: (path: string) => {},
    changeTitle: (title: string) => {},
    currentTitle: "",
    paths: [""],
    clearPaths: () => {}
});

export interface PageNavigatorProps {}

const PageNavigator: React.FC<PageNavigatorProps> = ({ children }) => {
    const [currentPath, setCurrentPath] = useState(history.location.pathname);
    const [currentTitle, setCurrentTitle] = useState(currentPath === "/" ? "Home" : "Experience");
    const [paths, setPaths] = useState<string[]>(["/"]);

    const addPath = (path: string) => {
        if (!paths.includes(path)) {
            const newPaths = [...paths];
            newPaths.push(path);
            setPaths(newPaths);
        }
    };

    const changeTitle = (title: string) => {
        setCurrentTitle(title);
    };

    const handleChangePage = (location: Location) => {
        const path = location.pathname;
        setCurrentPath(path);
    };

    useLayoutEffect(() => {
        let unlisten = history.listen(handleChangePage);
        return () => {
            unlisten();
        };
    }, []);

    return (
        <PageNavigatorContext.Provider value={{ currentPath, addPath, clearPaths: () => { setPaths([]) }, paths, changeTitle, currentTitle }}>
            <div className="flex flex-col min-h-screen w-screen">
                {children}
            </div>
        </PageNavigatorContext.Provider>
    );
};

export default PageNavigator;