import React from "react";
import { ReactComponent as FacebookIcon } from "../../../images/icons/facebookIcon.svg";
import { ReactComponent as LinkedInIcon } from "../../../images/icons/linkedInIcon.svg";
import Link from "../../atoms/buttons and links/Link";
import { useAuth } from "../../../contexts/AuthContext";
import {
  FooterStyled,
  SocialIconsContainer,
  SocialLink,
  Spacer,
  LinksContainer,
  AuthLinksContainer,
  FooterLink,
  UserInfo,
  UserName,
  CopyrightText
} from "./Footer.styled";

interface FooterProps {
  isInsideMenu: boolean;
}

const Footer: React.FC<FooterProps> = ({ isInsideMenu }) => {
  const auth = useAuth();

  return (
    <FooterStyled $isInsideMenu={isInsideMenu}>
      <SocialIconsContainer>
        <SocialLink
          href="https://facebook.com/danny.aboo.5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon />
        </SocialLink>
        <SocialLink
          href="https://www.linkedin.com/in/danielaboo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
        </SocialLink>
      </SocialIconsContainer>
      
      <Spacer />
      
      <LinksContainer>
        <AuthLinksContainer $isLoggedIn={!!auth.isLoggedIn}>
          {!auth.isLoggedIn ? (
            <>
              <Link to="/login">
                <FooterLink as="span">Login</FooterLink>
              </Link>
              <Link to="/register">
                <FooterLink as="span">Register</FooterLink>
              </Link>
            </>
          ) : (
            <>
              <UserInfo>
                Logged in as{" "}
                {auth.user && (
                  <UserName>
                    {auth.user?.displayName
                      ? auth.user.displayName
                      : auth.user?.uid}
                  </UserName>
                )}
              </UserInfo>
              <FooterLink onClick={auth.logout}>
                Logout
              </FooterLink>
            </>
          )}
        </AuthLinksContainer>
        
        <Link to="/cv">
          <FooterLink as="span">Curriculum Vitae</FooterLink>
        </Link>
        
        {auth.isDeveloper && (
          <Link to="/developerTools">
            <FooterLink as="span">Developer Tools</FooterLink>
          </Link>
        )}
        
        {auth.isOwner && (
          <Link to="/messages">
            <FooterLink as="span">Messages</FooterLink>
          </Link>
        )}
      </LinksContainer>
      
      <CopyrightText>© Aboo Daniel - All rights reserved</CopyrightText>
    </FooterStyled>
  );
};

export default Footer;
