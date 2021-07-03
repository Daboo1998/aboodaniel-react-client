import React, {FormEventHandler, useState} from "react";
import PageLayout from "../PageLayout";
import Spacer from "../../../atoms/utilities/Spacer";
import {useAuth} from "../../../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import "firebase/auth";
import SignInWithGoogleButton from "../../../atoms/buttons and links/SignInWithGoogleButton";

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
            <h1>Register</h1>
            <div className="flex flex-col items-center">
                <form className="w-min" onSubmit={handleSubmit}>
                    <label>
                        <p>Display name: </p>
                        <input type="text" onChange={e => setDisplayName(e.target.value)} className="border border-black rounded px-1" />
                    </label>
                    <label>
                        <p>Email</p>
                        <input type="text" onChange={e => setEmail(e.target.value)} className="border border-black rounded px-1" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} className="border border-black rounded px-1" />
                    </label>
                    <label>
                        <p>Confirm password</p>
                        <input type="password" onChange={e => setPasswordConfirmation(e.target.value)} className="border border-black rounded px-1" />
                    </label>
                    {!!errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
                    <div className="flex flex-row items-center">
                        <input
                            type="checkbox"
                            checked={shouldRememberUser}
                            onChange={e => setShouldRememberUser(e.target.checked)}
                        />
                        <p className="pl-2">Remember me</p>
                    </div>
                    <div className="pt-2">
                        <button type="submit" className="border border-black rounded bg-gray-200 dark:bg-black dark:hover:bg-gray-700 hover:bg-white p-1">Submit</button>
                    </div>
                    <div className="pt-2">
                        <div className="pt-2">
                            <SignInWithGoogleButton onClick={handleRegisterWithGoogle} />
                        </div>
                    </div>
                </form>
                <Spacer />
            </div>
        </PageLayout>
    );
};

export default RegisterPageLayout;