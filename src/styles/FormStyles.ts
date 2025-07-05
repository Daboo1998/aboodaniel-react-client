import styled from 'styled-components';
import { theme } from './theme';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: ${theme.spacing[6]};
  gap: ${theme.spacing[4]};
  align-items: center;

  @media (min-width: ${theme.breakpoints.md}) {
    width: 24rem;
  }
`;