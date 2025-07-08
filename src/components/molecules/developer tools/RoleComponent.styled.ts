import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const RoleItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const RoleHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.black};
  border-top: 4px solid ${theme.colors.black};
  padding: ${theme.spacing[2]};
  gap: ${theme.spacing[2]};

  @media (prefers-color-scheme: dark) {
    border-color: ${theme.colors.white};
  }
`;

export const RoleCheckbox = styled.input`
  width: ${theme.spacing[4]};
  height: ${theme.spacing[4]};
  cursor: pointer;
  accent-color: ${theme.colors.blue[500]};
  
  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const RoleTitle = styled.h3`
  margin: 0;
  padding-left: ${theme.spacing[2]};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const UsersList = styled.ol`
  padding-left: ${theme.spacing[4]};
  margin: 0;
  list-style: none;
`;

export const UserItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing[1]} 0;
  gap: ${theme.spacing[2]};
`;

export const UserCheckbox = styled.input`
  width: ${theme.spacing[4]};
  height: ${theme.spacing[4]};
  cursor: pointer;
  accent-color: ${theme.colors.blue[500]};
  
  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const UserText = styled.p`
  margin: 0;
  padding-left: ${theme.spacing[2]};
  color: ${theme.colors.gray[800]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[200]};
  }
`;