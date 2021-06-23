import React, {EventHandler, FormEventHandler, useState} from "react";
import PageLayout from "./PageLayout";
import Spacer from "../atoms/Spacer";
import {useAuth} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import Link from "../atoms/Link";
import "firebase/auth";

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
                history.push(loginSource);
            } else {
                // TODO: display errors
                console.log("No user")
            }
        }).catch(e => {
            console.log("something is wrong!");
            console.log(e);

            if (e.code === "auth/user-not-found") {
                setErrorMessage("There is no user with provided email!");
            } else if (e.code === "auth/wrong-password") {
                setErrorMessage("Wrong password!");
            } else if (e.code === "auth/invalid-email") {
                setErrorMessage("Email is wrongly formatted!")
            } else {
                setErrorMessage(e.message);
            }
        });
    };

    return (
        <PageLayout>
            <h1>Login</h1>
            <div className="flex flex-col items-center">
                <form className="w-min" onSubmit={handleSubmit}>
                    <label>
                        <p>Email</p>
                        <input
                            type="text"
                            onChange={e => setEmail(e.target.value)}
                            className="border border-black rounded px-1"
                        />
                    </label>
                    <label>
                        <p>Password</p>
                        <input
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            className="border border-black rounded px-1"
                        />
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
                    <Link to="/register">
                        Register instead
                    </Link>
                </form>
                <Spacer />
            </div>
        </PageLayout>
    );
};

export default LoginPageLayout;