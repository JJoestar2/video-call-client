import * as yup from "yup";

export const LoginFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  rememberMe: yup.boolean(),
});

export const defaultValues = {
    email: '',
    password: '',
    rememberMe: false,
};