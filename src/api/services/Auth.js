import { apiClient } from "../client";

const Entity = 'auth';

export class AuthService {
    signIn = async (loginData) => {
        return (await apiClient.post(`/${Entity}/login`, loginData)).data;
    };

    signUp = async (signUpData) => {
        return (await apiClient.post(`/${Entity}/register`, signUpData)).data;
    };
}