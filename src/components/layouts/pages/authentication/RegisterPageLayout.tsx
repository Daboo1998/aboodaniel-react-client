import React, {FormEventHandler, useState, useEffect} from "react";
import PageLayout from "../PageLayout";
import {useAuth} from "../../../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import "firebase/auth";
import SignInWithGoogleButton from "../../../atoms/buttons and links/SignInWithGoogleButton";
import Button from "../../../atoms/buttons and links/Button";
import TextInput from "../../../atoms/input/TextInput";
import ShouldRememberUserCheckbox from "../../../atoms/input/ShouldRememberUserCheckbox";
import {useFormWithUnsavedChanges} from "../../../../hooks/useFormWithUnsavedChanges";
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

    // Initialize unsaved changes tracking
    const { 
        createChangeHandler, 
        setInitialValues, 
        markFormAsSubmitted 
    } = useFormWithUnsavedChanges({
        message: "You have unsaved registration information. Are you sure you want to leave?"
    });

    // Set initial form values
    useEffect(() => {
        setInitialValues({
            displayName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            shouldRememberUser: false
        });
    }, [setInitialValues]);

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
                markFormAsSubmitted(); // Mark form as submitted to stop tracking changes
                history.push(loginSource);
            } else {
                setErrorMessage("Something went wrong!")
            }
        }).catch(error => {
            console.log("something is wrong!");
            console.log(error);

            if (error.code === "auth/email-already-in-use") {
                setErrorMessage("Email is already in use!");
            } else if (error.code === "auth/invalid-email") {
                setErrorMessage("Email is wrongly formatted!");
            } else if (error.code === "auth/network-request-failed") {
                setErrorMessage("Problem with internet connection.");
            } else if (error.code === "auth/weak-password") {
                // To change in future
                setErrorMessage(error.message);
            } else {
                setErrorMessage(error.message);
            }
        });
    };

    return (
        <PageLayout title="Register">
            <RegisterTitle>Register</RegisterTitle>
            <RegisterContainer>
                <RegisterForm onSubmit={handleSubmit}>
                    <TextInput label="Display Name" name="displayName" onChange={createChangeHandler("displayName", setDisplayName)} />
                    <TextInput label="Email" name="email" onChange={createChangeHandler("email", setEmail)} />
                    <TextInput label="Password" name="password" onChange={createChangeHandler("password", setPassword)} isPassword />
                    <TextInput label="Confirm password" name="passwordConfirmation" onChange={createChangeHandler("passwordConfirmation", setPasswordConfirmation)} isPassword />
                    {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <ShouldRememberUserCheckbox shouldRememberUser={shouldRememberUser} setShouldRememberUser={createChangeHandler("shouldRememberUser", setShouldRememberUser)}/>
                    <SubmitButtonContainer>
                        <Button label="register" submit />
                    </SubmitButtonContainer>
                    <SignInWithGoogleButton onError={setErrorMessage} shouldRememberUser={shouldRememberUser} />
                </RegisterForm>
            </RegisterContainer>
        </PageLayout>
    );
};

export default RegisterPageLayout;