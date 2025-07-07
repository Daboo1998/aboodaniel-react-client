import styled from 'styled-components';

export const StyledLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font: inherit;
  text-decoration: inherit;
  color: inherit;
  
  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;