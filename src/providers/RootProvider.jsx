'use client';

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material";

import ReactQueryProvider from '../providers/ReactQueryProvider';
import { SocketProvider } from '../contexts';

import { theme } from '../styles/theme'

const RootProvider = ({ children, session }) => {
    return (
        <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
                {/* <SocketProvider> */}
                    <ReactQueryProvider>
                        {children}
                    </ReactQueryProvider>
                {/* </SocketProvider> */}
          </ThemeProvider>
      </SessionProvider>
    )
}

export default RootProvider;
