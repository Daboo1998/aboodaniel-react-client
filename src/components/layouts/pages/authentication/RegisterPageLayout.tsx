import React, {FormEventHandler, useState} from "react";
import PageLayout from "../PageLayout";
import {useAuth} from "../../../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import "firebase/auth";
import SignInWithGoogleButton from "../../../atoms/buttons and links/SignInWithGoogleButton";
import TextInput from "../../../atoms/input/TextInput";
import ShouldRememberUserCheckbox from "../../../atoms/input/ShouldRememberUserCheckbox";
import useScrollReveal from "../../../../hooks/useScrollReveal";
import {
    RegisterTitle,
    RegisterContainer,
    RegisterForm,
    ErrorMessage,
    SubmitButtonContainer
} from "./RegisterPageLayout.styled";

const RegisterPageLayout: React.FC = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [shouldRememberUser, setShouldRememberUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const {register, loginSource} = useAuth();
    const history = useHistory();
    useScrollReveal();

    const handleSubmit: FormEventHandler = async (event) => {
        event.preventDefault();
        setErrorMessage(undefined);

        if (password !== passwordConfirmation) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        register(email, password, true).then((credentials) => {
            if (credentials) {
                console.log(`Registered in with uid="${credentials.user?.uid}"`);
                if (displayName !== "") {
                    credentials.user?.updateProfile({displayName: displayName})
                }
                history.push(loginSource);
            } else {
                setErrorMessage("Something went wrong!")
            }
        }).catch(error => {
            if (error.code === "auth/email-already-in-use") {
                setErrorMessage("Email is already in use!");
            } else if (error.code === "auth/invalid-email") {
                setErrorMessage("Email is wrongly formatted!");
            } else if (error.code === "auth/network-request-failed") {
                setErrorMessage("Problem with internet connection.");
            } else if (error.code === "auth/weak-password") {
                setErrorMessage(error.message);
            } else {
                setErrorMessage(error.message);
            }
        });
    };

    return (
        <PageLayout title="Register">
            <RegisterContainer>
                <span className="kicker reveal in">
                    <span className="idx">✦</span> — Create Account
                </span>
                <RegisterTitle className="reveal in" data-delay="1">
                    Get started
                </RegisterTitle>
                <RegisterForm className="card reveal" data-delay="2" onSubmit={handleSubmit}>
                    <TextInput label="Display Name" name="displayName" onChange={setDisplayName} autoComplete="name" />
                    <TextInput label="Email" name="email" onChange={setEmail} autoComplete="email" />
                    <TextInput label="Password" name="password" onChange={setPassword} isPassword />
                    <TextInput label="Confirm password" name="passwordConfirmation" onChange={setPasswordConfirmation} isPassword />
                    {!!errorMessage && <ErrorMessage role="alert">{errorMessage}</ErrorMessage>}
                    <ShouldRememberUserCheckbox shouldRememberUser={shouldRememberUser} setShouldRememberUser={setShouldRememberUser} />
                    <SubmitButtonContainer>
                        <button type="submit" className="btn btn-primary">
                            Create Account <span className="arrow">→</span>
                        </button>
                    </SubmitButtonContainer>
                    <SignInWithGoogleButton onError={setErrorMessage} shouldRememberUser={shouldRememberUser} />
                </RegisterForm>
            </RegisterContainer>
        </PageLayout>
    );
};

export default RegisterPageLayout;
