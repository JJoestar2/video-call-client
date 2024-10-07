import { decodeJwt } from 'jose';
import CredentialsProvider from 'next-auth/providers/credentials';

import { Api } from '../api';

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
              email: {},
              password: {},
              rememberMe: {},
            },
            async authorize(credentials) {
                try {
                   const userData = await Api.Auth.signIn({
                    email: credentials?.email || '',
                    password: credentials?.password || '',
                    rememberMe: Boolean(credentials?.rememberMe),
                   });

                   if (userData) return {
                        id: userData.user.sub,
                        accessToken: userData.accessToken,
                        refreshToken: userData.refreshToken,
                        name: userData.user.name,
                        email: userData.user.email,
                        image: userData.user.avatar,
                    };
                   
                   return null;
                } catch (error) {
                    return {
                        id: '',
                        accessToken: undefined,
                        error: 'Something went wrong!'
                    }
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: 'login',
    },
    callbacks: {
        async signIn({ user }) {
            return !!user;
        },
        async jwt({ token, user }) {
            if (user) {
                return {
                    sub: user?.id,
                    accessToken: user?.accessToken,
                    refreshToken: user?.refreshToken,
                    name: user?.name,
                    email: user?.email,
                    image: user?.image
                }
            }

            // Token exists and fresh
            if (
                token.accessToken &&
                Date.now() < (decodeJwt(token.accessToken).exp || 0) * 1000
              ) {
                return token;
            }

            try {
                if (!token.refreshToken) {
                    throw new Error('Refresh Token Needed!');
                }

                const { accessToken } = await Api.Auth.refresh(token.refreshToken);

                if (!accessToken) {
                    throw new Error('Error occured during refreshing the tokens')
                }

                return {
                    ...token,
                    accessToken,
                }
            } catch (err) {
                console.error(e);
                return {
                  ...token,
                  error: e?.message ?? 'Auth Error',
                };
            }
        },
        async session({ session, token }) {
            session.user.id = token.sub;
            session.user.accessToken = token.accessToken;
            session.user.image = token.image;
            
            session.error = token.error;

            return session;
        },
        async redirect({ baseUrl }) {
            return baseUrl;
        }
    }
}