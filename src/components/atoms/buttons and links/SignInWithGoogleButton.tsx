import React, {FormEventHandler} from 'react';
import {useAuth} from "../../../contexts/AuthContext";
import {useHistory} from "react-router-dom";

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
        <button
            className="flex flex-row items-center p-2 border border-gray-200 rounded-lg w-max shadow-sm hover:border-blue-800"
            onClick={handleLoginWithGoogle}
        >
            <img className="w-5" src="images/googleIcon.png" alt="" />
            <p className="flex-shrink-0 pl-2 font-light">Sign In with Google</p>
        </button>
    );
};

export default SignInWithGoogleButton;