import React, {FormEventHandler, useState} from "react";
import PageLayout from "./PageLayout";
import Spacer from "../atoms/Spacer";
import {useAuth} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import "firebase/auth";

const RegisterPageLayout: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [shouldRememberUser, setShouldRememberUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const {register, loginSource} = useAuth();
    const history = useHistory();

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        setErrorMessage(undefined);

        if (password !== passwordConfirmation) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        register(email, password, true).then((c) => {
            if (c) {
                console.log(`Registered in with uid="${c.user?.uid}"`);
                history.push(loginSource);
            } else {
                setErrorMessage("Something went wrong!")
            }
        }).catch(e => {
            console.log("something is wrong!");
            console.log(e);

            if (e.code === "auth/email-already-in-use") {
                setErrorMessage("Email is already in use!");
            } else if (e.code === "auth/invalid-email") {
                setErrorMessage("Email is wrongly formatted!");
            } else if (e.code === "auth/weak-password") {
                // To change in future
                setErrorMessage(e.message);
            } else {
                setErrorMessage(e.message);
            }
        });
    };

    return (
        <PageLayout>
            <h1>Register</h1>
            <div className="flex flex-col items-center">
                <form className="w-min" onSubmit={handleSubmit}>
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
                        <button type="submit" className="border border-black rounded bg-gray-200 p-1">Submit</button>
                    </div>
                </form>
                <Spacer />
            </div>
        </PageLayout>
    );
};

export default RegisterPageLayout;