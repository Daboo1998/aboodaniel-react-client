import React, {FormEventHandler} from 'react';
import {useAuth} from "../../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import { media } from "../../../utils/media";

export interface SignInWithGoogleButtonProps {
    onError: (message: string) => void;
    shouldRememberUser: boolean;
}

const SignInWithGoogleButton: React.FC<SignInWithGoogleButtonProps> = ({ onError, shouldRememberUser }) => {
    const {loginSource, loginWithGoogle} = useAuth();
    const history = useHistory();

    const handleLoginWithGoogle: FormEventHandler = (e) => {
        e.preventDefault();

        loginWithGoogle(shouldRememberUser)
            .then(user => {
                if (user) {
                    console.log(`Logged in with uid="${user.user?.uid}"`);
                    history.push(loginSource === "/register" ? "/" : loginSource);
                } else {
                    onError("Something was wrong while logging in!");
                }
            }).catch(error => {
                onError(error.message);
            });
    };

    return (
        <StyledButton onClick={handleLoginWithGoogle}>
            <GoogleIcon src="images/googleIcon.png" alt="Google logo" />
            <Label>Sign In with Google</Label>
        </StyledButton>
    );
};

// ----------------------------- styled components ---------------------------

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem; /* Tailwind p-2 */
  border: 1px solid #e5e7eb; /* gray-200 */
  border-radius: 0.5rem; /* rounded-lg */
  width: max-content;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */

  ${media.up('md')} {
    &:hover {
      border-color: #1e40af; /* blue-800 */
    }
  }
`;

const GoogleIcon = styled.img`
  width: 1.25rem; /* w-5 */
`;

const Label = styled.p`
  padding-left: 0.5rem; /* pl-2 */
  font-weight: 300; /* font-light */
  white-space: nowrap;
`;

export default SignInWithGoogleButton;