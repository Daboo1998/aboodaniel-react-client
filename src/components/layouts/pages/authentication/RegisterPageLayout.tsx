import React, {FormEventHandler, useState} from "react";
import PageLayout from "../PageLayout";
import Spacer from "../../../atoms/utilities/Spacer";
import {useAuth} from "../../../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import "firebase/auth";
import SignInWithGoogleButton from "../../../atoms/buttons and links/SignInWithGoogleButton";
import SubmitButton from "../../../atoms/buttons and links/SubmitButton";
import TextInput from "../../../atoms/input/TextInput";
import ShouldRememberUserCheckbox from "../../../atoms/input/ShouldRememberUserCheckbox";

const RegisterPageLayout: React.FC = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [shouldRememberUser, setShouldRememberUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const {register, loginSource, loginWithGoogle} = useAuth();
    const history = useHistory();

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
            console.log("something is wrong!");
            console.log(error);

            if (error.code === "auth/email-already-in-use") {
                setErrorMessage("Email is already in use!");
            } else if (error.code === "auth/invalid-email") {
                setErrorMessage("Email is wrongly formatted!");
            } else if (error.code === "auth/weak-password") {
                // To change in future
                setErrorMessage(error.message);
            } else {
                setErrorMessage(error.message);
            }
        });
    };

    const handleRegisterWithGoogle: FormEventHandler = (e) => {
        e.preventDefault();

        loginWithGoogle(shouldRememberUser)
            .then(user => {
                if (user) {
                    console.log(`Logged in with uid="${user.user?.uid}"`);
                    history.push(loginSource === "/register" ? "/" : loginSource);
                } else {
                    setErrorMessage("Something was wrong while logging in!");
                }
            }).catch(error => {
            console.log("something is wrong!");
            console.log(error);
        });
    };

    return (
        <PageLayout>
            <h1 className="text-center">Register</h1>
            <div className="flex flex-col items-center pt-2">
                <form className="w-min <md:w-full flex flex-col place-items-center space-y-4" onSubmit={handleSubmit}>
                    <TextInput label="Display Name" name="displayName" onChange={setDisplayName} />
                    <TextInput label="Email" name="email" onChange={setEmail} />
                    <TextInput label="Password" name="password" onChange={setPassword} isPassword />
                    <TextInput label="Confirm password" name="passwordConfirmation" onChange={setPasswordConfirmation} isPassword />
                    {!!errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
                    <ShouldRememberUserCheckbox shouldRememberUser={shouldRememberUser} setShouldRememberUser={setShouldRememberUser}/>
                    <SubmitButton label="register" />
                    <SignInWithGoogleButton onClick={handleRegisterWithGoogle} />
                </form>
            </div>
        </PageLayout>
    );
};

export default RegisterPageLayout;