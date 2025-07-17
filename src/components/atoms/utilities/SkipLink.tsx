import React from 'react';
import styled from 'styled-components';
import { skipToMainContent } from '../../../utils/accessibility';

const StyledSkipLink = styled.a`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  background-color: #000;
  color: #fff;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 999999;

  &:focus {
    position: fixed;
    left: 16px;
    top: 16px;
    width: auto;
    height: auto;
    overflow: visible;
    outline: 3px solid #0066cc;
    outline-offset: 2px;
  }
`;

const SkipLink: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    skipToMainContent();
  };

  return (
    <StyledSkipLink 
      href="#main-content" 
      onClick={handleClick}
    >
      Skip to main content
    </StyledSkipLink>
  );
};

export default SkipLink;