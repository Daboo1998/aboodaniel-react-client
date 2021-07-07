import React from "react";
import { ReactComponent as FacebookIcon } from "../../../images/icons/facebookIcon.svg";
import { ReactComponent as LinkedInIcon } from "../../../images/icons/linkedInIcon.svg";

const Footer: React.FC = () => {
    return (
        <div className="flex flex-col bg-gray-200 dark:bg-black pb-6">
            <div className="flex flex-row">
                <a href="https://facebook.com/danny.aboo.5" target="_blank" rel="noopener noreferrer" className="p-2"><FacebookIcon /></a>
                <a href="https://www.linkedin.com/in/danielaboo" target="_blank" rel="noopener noreferrer" className="p-2"><LinkedInIcon /></a>
            </div>
            <br />
            <p className="text-center">Aboo Daniel - All rights reserved</p>
        </div>
    );
};

export default Footer;