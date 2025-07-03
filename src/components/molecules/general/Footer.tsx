import React from "react";
import { ReactComponent as FacebookIcon } from "../../../images/icons/facebookIcon.svg";
import { ReactComponent as LinkedInIcon } from "../../../images/icons/linkedInIcon.svg";
import Link from "../../atoms/buttons and links/Link";
import { useAuth } from "../../../contexts/AuthContext";

import * as S from "./Footer.styled";
import styled from "styled-components";
import { media } from "../../../utils/media";
import { css } from "styled-components";

interface FooterProps {
  isInsideMenu: boolean;
}

const Footer: React.FC<FooterProps> = ({ isInsideMenu }) => {
  const auth = useAuth();

  return (
    <S.FooterStyled $insideMenu={isInsideMenu}>
      <S.SocialIcons>
        <S.IconLink
          href="https://facebook.com/danny.aboo.5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon />
        </S.IconLink>
        <S.IconLink
          href="https://www.linkedin.com/in/danielaboo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
        </S.IconLink>
      </S.SocialIcons>
      <br />
      <S.Content>
        <S.AuthLinksWrapper $column={!!auth.isLoggedIn}>
          {!auth.isLoggedIn ? (
            <>
              <FooterNavLink to="/login">Login</FooterNavLink>
              <FooterNavLink to="/register">Register</FooterNavLink>
            </>
          ) : (
            <>
              <p>
                Logged in as{' '}
                {auth.user && (
                  <HighlightSpan>
                    {auth.user?.displayName || auth.user?.uid}
                  </HighlightSpan>
                )}
              </p>
              <FooterButton type="button" onClick={auth.logout}>
                Logout
              </FooterButton>
            </>
          )}
        </S.AuthLinksWrapper>
        <FooterNavLink to="/cv">Curriculum Vitae</FooterNavLink>
        {auth.isDeveloper && (
          <FooterNavLink to="/developerTools">Developer Tools</FooterNavLink>
        )}
        {auth.isOwner && (
          <FooterNavLink to="/messages">Messages</FooterNavLink>
        )}
      </S.Content>
      <SmallText>© Aboo Daniel - All rights reserved</SmallText>
    </S.FooterStyled>
  );
};

// ----------------------- styled helpers inside footer ----------------------

const baseInteractiveStyles = css`
  color: #4b5563; /* gray-600 */
  text-align: center;
  ${media.up('md')} {
    &:hover {
      color: #1f2937; /* gray-800 */
    }
  }
`;

const FooterNavLink = styled(Link)`
  ${baseInteractiveStyles}
`;

const FooterButton = styled.button`
  ${baseInteractiveStyles}
  background: none;
  border: none;
  cursor: pointer;
`;

const HighlightSpan = styled.span`
  color: #1e40af; /* blue-800 */
`;

const SmallText = styled.p`
  text-align: center;
  font-size: 0.75rem; /* text-xs */
`;

export default Footer;
