import React, {FormEventHandler, useState} from "react";
import PageLayout from "./PageLayout";
import Spacer from "../atoms/Spacer";
import {useAuth} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

const LoginPageLayout: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {login, loginSource} = useAuth();
    const history = useHistory();

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        login(email, password).then(user => {
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
        });
    };

    return (
        <PageLayout>
            <h1>Login</h1>
            <div className="flex flex-col items-center">
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Email</p>
                        <input type="text" onChange={e => setEmail(e.target.value)} className="border border-black rounded px-1" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} className="border border-black rounded px-1" />
                    </label>
                    <div className="pt-2">
                        <button type="submit" className="border border-black rounded bg-gray-200 p-1">Submit</button>
                    </div>
                </form>
                <Spacer />
            </div>
        </PageLayout>
    );
};

export default LoginPageLayout;