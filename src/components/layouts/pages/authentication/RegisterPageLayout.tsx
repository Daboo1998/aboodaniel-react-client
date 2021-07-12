import React, {FormEventHandler, useState} from "react";
import PageLayout from "../PageLayout";
import {useAuth} from "../../../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import "firebase/auth";
import SignInWithGoogleButton from "../../../atoms/buttons and links/SignInWithGoogleButton";
import Button from "../../../atoms/buttons and links/Button";
import TextInput from "../../../atoms/input/TextInput";
import ShouldRememberUserCheckbox from "../../../atoms/input/ShouldRememberUserCheckbox";

const RegisterPageLayout: React.FC = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [shouldRememberUser, setShouldRememberUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const {register, loginSource} = useAuth();
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
            <h1 className="text-center">Register</h1>
            <div className="flex flex-col place-items-center h-full pt-2">
                <form onSubmit={handleSubmit}>
                    <TextInput label="Display Name" name="displayName" onChange={setDisplayName} />
                    <TextInput label="Email" name="email" onChange={setEmail} />
                    <TextInput label="Password" name="password" onChange={setPassword} isPassword />
                    <TextInput label="Confirm password" name="passwordConfirmation" onChange={setPasswordConfirmation} isPassword />
                    {!!errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
                    <ShouldRememberUserCheckbox shouldRememberUser={shouldRememberUser} setShouldRememberUser={setShouldRememberUser}/>
                    <Button className="w-full px-5 py-2" label="register" submit/>
                    <SignInWithGoogleButton onError={setErrorMessage} shouldRememberUser={shouldRememberUser} />
                </form>
            </div>
        </PageLayout>
    );
};

export default RegisterPageLayout;