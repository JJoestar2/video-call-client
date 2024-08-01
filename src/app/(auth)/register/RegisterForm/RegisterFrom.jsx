'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";

import { Button, TextField } from "@mui/material";

import { Api } from '../../../../api';
import { RegisterFormSchema, defaultValues } from "../schema";

const RegisterForm = () => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: yupResolver(RegisterFormSchema),
        defaultValues: defaultValues
    });
    const router = useRouter();

    const { mutate: signInMutation, isPending } = useMutation({
        mutationFn: (data) => {
            return signIn("credentials", {
              email: data.email,
              password: data.password,
              rememberMe: true,
              redirect: false,
            });
        },
        onSuccess: (data) => {
            if (!data?.ok) {
                return;
            }
          
          router.push('/');
          router.refresh();
        },
    });


    const handleRegister = async (values) => {
        try {
            const newUser = await Api.Auth.signUp(values);
            if (!newUser) return;

            signInMutation(values);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <Controller
                name="name"
                control={control}
                render={({ field }) => <TextField {...field} ref={null} fullWidth placeholder="Name *"/>}
            />
            <Controller
                name="email"
                control={control}
                render={({ field }) => <TextField {...field} ref={null} fullWidth placeholder="Email *"/>}
            />
            <Controller
                name="password"
                control={control}
                render={({ field }) => <TextField {...field} ref={null} fullWidth placeholder="Password *"/>}
            />

            <Button type="submit" fullWidth color="primary" variant="contained">
                Register
            </Button>

            <div>
                <Link href='/login'>Already have an account? Sign in</Link>
            </div>
        </form>
    )
}

export default RegisterForm;