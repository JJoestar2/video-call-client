import React from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RegisterForm from "./RegisterForm";

const SignUpPage = () => {
    return (
        <section>
            <div>
                <div>
                    <LockOutlinedIcon />
                </div>
                <h1>Sign Up</h1>
                <RegisterForm />
            </div>
        </section>
    )
}

export default SignUpPage;