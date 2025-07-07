import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

export const StyledCheckbox = styled.input`
  width: ${theme.spacing[4]};
  height: ${theme.spacing[4]};
  cursor: pointer;
  accent-color: ${theme.colors.blue[500]};
  
  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const CheckboxLabel = styled.p`
  margin: 0;
  cursor: pointer;
  user-select: none;
  color: ${theme.colors.gray[800]};
  
  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;