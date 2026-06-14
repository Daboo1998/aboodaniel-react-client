import React, {FormEventHandler, useEffect, useState} from "react";
import {useAuth} from "../../../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import Link from "../../../atoms/buttons and links/Link";
import SignInWithGoogleButton from "../../../atoms/buttons and links/SignInWithGoogleButton";
import TextInput from "../../../atoms/input/TextInput";
import ShouldRememberUserCheckbox from "../../../atoms/input/ShouldRememberUserCheckbox";
import useScrollReveal from "../../../../hooks/useScrollReveal";
import PortfolioFooter from "../../../molecules/general/PortfolioFooter";
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
    useScrollReveal();

    useEffect(() => {
        document.title = "Daniel Aboo — Sign In";
    }, []);

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
        <>
            <LoginContainer>
                <span className="kicker reveal in">
                    <span className="idx">✦</span> — Sign In
                </span>
                <LoginTitle className="reveal in" data-delay="1">
                    Welcome back
                </LoginTitle>
                <LoginForm className="card reveal" data-delay="2" onSubmit={handleSubmit}>
                    <TextInput label="Email" name="email" onChange={setEmail} autoComplete="email" />
                    <TextInput label="Password" name="password" onChange={setPassword} isPassword />
                    {!!errorMessage && <ErrorMessage role="alert">{errorMessage}</ErrorMessage>}
                    <ShouldRememberUserCheckbox shouldRememberUser={shouldRememberUser} setShouldRememberUser={setShouldRememberUser} />
                    <SubmitButtonContainer>
                        <button type="submit" className="btn btn-primary">
                            Log In <span className="arrow">→</span>
                        </button>
                    </SubmitButtonContainer>
                    <SignInWithGoogleButton onError={setErrorMessage} shouldRememberUser={shouldRememberUser} />
                    <RegisterLinkContainer>
                        <Link to="/register">
                            Register instead
                        </Link>
                    </RegisterLinkContainer>
                </LoginForm>
            </LoginContainer>
            <PortfolioFooter variant="minimal" />
        </>
    );
};

export default LoginPageLayout;
