import React, {FormEventHandler, useState} from "react";
import PageLayout from "../PageLayout";
import {useAuth} from "../../../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import Link from "../../../atoms/buttons and links/Link";
import SignInWithGoogleButton from "../../../atoms/buttons and links/SignInWithGoogleButton";
import TextInput from "../../../atoms/input/TextInput";
import ShouldRememberUserCheckbox from "../../../atoms/input/ShouldRememberUserCheckbox";
import Button from "../../../atoms/buttons and links/Button";
import {
    LoginTitle,
    LoginContainer,
    LoginForm,
    ErrorMessage,
    SubmitButtonContainer,
    RegisterLinkContainer
} from "./LoginPageLayout.styled";

const LoginPageLayout: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [shouldRememberUser, setShouldRememberUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const {login, loginSource} = useAuth();
    const history = useHistory();

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        login(email, password, shouldRememberUser).then(user => {
            if (user) {
                console.log(`Logged in with uid="${user.user?.uid}"`);
                history.push(loginSource === "/register" ? "/" : loginSource);
            } else {
                setErrorMessage("Something was wrong while logging in!");
            }
        }).catch(error => {
            console.log("something is wrong!");
            console.log(error);

            if (error.code === "auth/user-not-found") {
                setErrorMessage("There is no user with provided email!");
            } else if (error.code === "auth/wrong-password") {
                setErrorMessage("Wrong password!");
            } else if (error.code === "auth/invalid-email") {
                setErrorMessage("Email is wrongly formatted!");
            } else if (error.code === "auth/network-request-failed") {
                setErrorMessage("Problem with internet connection.");
            } else {
                console.error(error);
                setErrorMessage(error.message);
            }
        });
    };

    return (
        <PageLayout title="Login">
            <LoginTitle>Login</LoginTitle>
            <LoginContainer>
                <LoginForm onSubmit={handleSubmit}>
                    <TextInput label="Email" name="email" onChange={setEmail} />
                    <TextInput label="Password" name="password" onChange={setPassword} isPassword />
                    {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <ShouldRememberUserCheckbox shouldRememberUser={shouldRememberUser} setShouldRememberUser={setShouldRememberUser} />
                    <SubmitButtonContainer>
                        <Button label="log in" submit />
                    </SubmitButtonContainer>
                    <SignInWithGoogleButton onError={setErrorMessage} shouldRememberUser={shouldRememberUser} />
                    <RegisterLinkContainer>
                        <Link to="/register">
                            Register instead
                        </Link>
                    </RegisterLinkContainer>
                </LoginForm>
            </LoginContainer>
        </PageLayout>
    );
};

export default LoginPageLayout;