import {useContext} from "react";
import {NavigationContext} from "../components/context providers/NavigationProvider";

const useNavigation = () => useContext(NavigationContext);

export default useNavigation;