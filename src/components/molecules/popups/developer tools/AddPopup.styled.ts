import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const PopupContent = styled.div`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.xl};
  min-width: 300px;
  max-width: 400px;

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.colors.gray[800]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    max-width: 100%;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing[4]};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing[2]};
  align-self: flex-end;
  border-radius: ${theme.borderRadius.sm};

  svg {
    width: ${theme.spacing[6]};
    height: ${theme.spacing[6]};
    fill: ${theme.colors.gray[600]};
    transition: fill ${theme.transitions.duration[200]} ${theme.transitions.easing['in-out']};
  }

  &:hover svg {
    fill: ${theme.colors.gray[800]};
  }

  @media (prefers-color-scheme: dark) {
    svg {
      fill: ${theme.colors.gray[400]};
    }

    &:hover svg {
      fill: ${theme.colors.white};
    }
  }

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[4]};
`;

export const ErrorMessage = styled.p`
  color: ${theme.colors.red[600]};
  font-size: ${theme.fontSizes.sm};
  margin: 0;
  text-align: center;
`;

export const SubmitButtonContainer = styled.div`
  width: 100%;

  button {
    width: 100%;
    padding: ${theme.spacing[2]} ${theme.spacing[5]};
  }
`;