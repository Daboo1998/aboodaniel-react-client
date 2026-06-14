import React, {FormEventHandler} from 'react';
import {useAuth} from "../../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import {
    GoogleSignInButton,
    GoogleIcon,
    ButtonText
} from "./SignInWithGoogleButton.styled";

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
        <GoogleSignInButton 
            onClick={handleLoginWithGoogle}
            aria-label="Sign in with Google"
        >
            <GoogleIcon src="images/googleIcon.png" alt="Google logo" />
            <ButtonText>Sign In with Google</ButtonText>
        </GoogleSignInButton>
    );
};

export default SignInWithGoogleButton;