'use client';

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";

import { TextField, Button, Checkbox } from "@mui/material";

import { LoginFormSchema, defaultValues } from "../schema";

const LoginForm = () => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: yupResolver(LoginFormSchema),
        defaultValues: defaultValues
    });
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: (data) => {
            return signIn("credentials", {
              ...data,
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

    const handleLogin = (values) => {
        mutate(values);
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
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
            <div>
                <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => <Checkbox {...field} ref={null} />}
                />
                <p>Remember me</p>
            </div>

            <Button type="submit" fullWidth color="primary" variant="contained">
                Sign In
            </Button>

            <div>
                <Link href='/forgot-password'>Forgot password?</Link>
                <Link href='/register'>Don't have an account? Sign Up</Link>
            </div>
        </form>
    )
}

export default LoginForm;