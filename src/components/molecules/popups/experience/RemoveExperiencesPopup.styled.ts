import styled from 'styled-components';
import { ErrorMessage as BaseErrorMessage } from '../shared.styled';

export { PopupContent, HeaderRow, HeaderTitle, CloseButton, SelectList, SelectItem, SelectCheckbox, SelectLabel, PopupFooter, DangerButton } from '../shared.styled';

/* Remove popups render ErrorMessage outside of FormBody, so it needs horizontal margin */
export const ErrorMessage = styled(BaseErrorMessage)`
  margin: 0 1.4rem;
`;
