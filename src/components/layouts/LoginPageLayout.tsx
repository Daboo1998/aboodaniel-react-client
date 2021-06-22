import React, {FormEventHandler, useState} from "react";
import PageLayout from "./PageLayout";
import Spacer from "../atoms/Spacer";
import {useAuth} from "../../contexts/AuthContext";
import {useHistory} from "react-router-dom";

const LoginPageLayout: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {login, loginSource} = useAuth();
    const history = useHistory();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "alpine") {
            login();
            history.push(loginSource);
        }
    };

    return (
        <PageLayout>
            <h1>Login</h1>
            <div className="flex flex-col items-center">
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={e => setUsername(e.target.value)} className="border border-black rounded px-1" />
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