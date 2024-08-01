import React from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginForm from "./LoginForm";

const LoginPage = () => {
    return (
        <section>
            <div>
                <div>
                    <LockOutlinedIcon />
                </div>
                <h1>Sign in</h1>
                <LoginForm />
            </div>
        </section>
    );
}

export default LoginPage;