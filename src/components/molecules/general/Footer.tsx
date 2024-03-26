import React from "react";
import { ReactComponent as FacebookIcon } from "../../../images/icons/facebookIcon.svg";
import { ReactComponent as LinkedInIcon } from "../../../images/icons/linkedInIcon.svg";
import Link from "../../atoms/buttons and links/Link";
import { useAuth } from "../../../contexts/AuthContext";

import * as styled from "./Footer.styled";
import { cx } from "../../../utils";

interface FooterProps {
  isInsideMenu: boolean;
}

const Footer: React.FC<FooterProps> = ({ isInsideMenu }) => {
  const auth = useAuth();

  return (
    <styled.FooterStyled
      className={cx(
        "flex flex-col bg-background-light dark:bg-background-dark pb-6 space-y-4",
        isInsideMenu ? "Menu" : ""
      )}
    >
      <div className="flex flex-row">
        <a
          href="https://facebook.com/danny.aboo.5"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2"
        >
          <FacebookIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/danielaboo"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2"
        >
          <LinkedInIcon />
        </a>
      </div>
      <br />
      <div className="flex flex-col items-center">
        <div
          className={`flex ${
            auth.isLoggedIn ? "flex-col" : "flex-row"
          } space-x-2`}
        >
          {!auth.isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-gray-600 text-center >md:hover:text-gray-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-600 text-center >md:hover:text-gray-800"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <p>
                Logged in as{" "}
                {auth.user && (
                  <span className="text-center text-blue-800 dark:text-blue-300">
                    {auth.user?.displayName
                      ? auth.user.displayName
                      : auth.user?.uid}
                  </span>
                )}
              </p>
              <button
                className="text-gray-600 text-center >md:hover:text-gray-800"
                onClick={auth.logout}
              >
                Logout
              </button>
            </>
          )}
        </div>
        <Link
          to="/cv"
          className="text-gray-600 text-center >md:hover:text-gray-800"
        >
          Curriculum Vitae
        </Link>
        {auth.isDeveloper && (
          <Link
            to="/developerTools"
            className="text-gray-600 text-center >md:hover:text-gray-800"
          >
            Developer Tools
          </Link>
        )}
        {auth.isOwner && (
          <Link
            to="/messages"
            className="text-gray-600 text-center >md:hover:text-gray-800"
          >
            Messages
          </Link>
        )}
      </div>
      <p className="text-center text-xs">© Aboo Daniel - All rights reserved</p>
    </styled.FooterStyled>
  );
};

export default Footer;
