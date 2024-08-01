import * as yup from "yup";

export const RegisterFormSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

export const defaultValues = {
    name: '',
    email: '',
    password: '',
};