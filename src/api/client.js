import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const ApiClient = () => {
    const axiosApi = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
    });

    const handleLogout = async () => {
        axios.defaults.headers.common['Authorization'] = undefined;
        await signOut();
    } 

    axiosApi.interceptors.request.use(async (request) => {
        if(request.headers['Authorization']) return request;

        const session = await getSession();
            
        const accessToken = session?.user?.accessToken;

        if(accessToken) {
            request.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return request;
    });

    axiosApi.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response && error.response.status === 403) {
                if (!!error.config?.retry) {
                    await handleLogout();
                    return Promise.reject(error);
                }

                // Saving initial request config
                const config = error.config;

                //reject if no config

                if (!config) {
                    await handleLogout();
                    return Promise.reject(error);
                }

                // todo add refresh token logic

                config.retry = true;
                return axiosApi(config);
            }

            return Promise.reject(error);
        }
    );

    return axiosApi;
}

export const apiClient = ApiClient();