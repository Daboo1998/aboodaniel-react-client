import React from 'react';

export interface SignInWithGoogleButtonProps {
    onClick: React.MouseEventHandler;
}

const SignInWithGoogleButton: React.FC<SignInWithGoogleButtonProps> = ({ onClick }) => (
    <button
        className="flex flex-row items-center p-2 border border-gray-200 rounded-lg w-max shadow-sm hover:border-blue-800"
        onClick={onClick}
    >
        <img className="w-5" src="images/googleIcon.png" alt="" />
        <p className="flex-shrink-0 pl-2 font-light">Sign In with Google</p>
    </button>
);

export default SignInWithGoogleButton;