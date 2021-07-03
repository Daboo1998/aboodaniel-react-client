import React, {FormEventHandler, useState} from "react";
import PageLayout from "../PageLayout";
import Spacer from "../../../atoms/utilities/Spacer";
import {useAuth} from "../../../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import Link from "../../../atoms/buttons and links/Link";
import SignInWithGoogleButton from "../../../atoms/buttons and links/SignInWithGoogleButton";
import TextInput from "../../../atoms/input/TextInput";
import ShouldRememberUserCheckbox from "../../../atoms/input/ShouldRememberUserCheckbox";
import SubmitButton from "../../../atoms/buttons and links/SubmitButton";

const LoginPageLayout: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [shouldRememberUser, setShouldRememberUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const {login, loginSource, loginWithGoogle} = useAuth();
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
                setErrorMessage("Email is wrongly formatted!")
            } else {
                setErrorMessage(error.message);
            }
        });
    };

    const handleLoginWithGoogle: FormEventHandler = (e) => {
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
            <h1 className="text-center">Login</h1>
            <div className="flex flex-col items-center h-full pt-2">
                <form className="w-min <md:w-full flex flex-col place-items-center space-y-4" onSubmit={handleSubmit}>
                    <TextInput label="Email" name="email" onChange={setEmail} />
                    <TextInput label="Password" name="password" onChange={setPassword} isPassword />
                    {!!errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
                    <ShouldRememberUserCheckbox shouldRememberUser={shouldRememberUser} setShouldRememberUser={setShouldRememberUser}/>
                    <SubmitButton label="log in" />
                    <SignInWithGoogleButton onClick={handleLoginWithGoogle} />
                    <Link to="/register" className="text-blue-500 pt-2">
                        Register instead
                    </Link>
                </form>
            </div>
        </PageLayout>
    );
};

export default LoginPageLayout;