import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const TextAreaInputContainer = styled.p`
  color: ${theme.colors.gray[800]};
  font-family: inherit;
  font-weight: ${theme.fontWeights.bold};
  width: 100%;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const TextAreaInputLabel = styled.label`
  margin-bottom: ${theme.spacing[2]};
  display: block;
`;

export const TextAreaLabelText = styled.p`
  margin: 0 0 ${theme.spacing[2]} 0;
  font-weight: inherit;
`;

export const RequiredAsterisk = styled.span`
  color: ${theme.colors.red[600]};
`;

export const StyledTextAreaInput = styled.textarea`
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.md};
  transition: border-color ${theme.transitions.duration[200]} ${theme.transitions.easing['in-out']};
  box-shadow: ${theme.shadows.inner};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[2]};
  width: 100%;
  font-family: inherit;
  background-color: ${theme.colors.white};
  resize: vertical;
  min-height: ${theme.spacing[24]};

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
    border-color: ${theme.colors.gray[600]};
  }

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
    border-color: ${theme.colors.blue[500]};
  }
`;