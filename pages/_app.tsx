import { ChakraProvider } from '@chakra-ui/react'
// import '../styles/globals.css'
// import { Providers } from "./api/auth/Providers";
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { Box } from "@chakra-ui/react"
import App from 'next/app'
import { ThemeProvider } from 'styled-components'

const theme = {}


function MyApp({ Component, pageProps: { session, ...pageProps }}) {
    return (
        <ChakraProvider>
            <ThemeProvider theme={theme}>
            <SessionProvider session={session}>
            <Component {...pageProps} />
            </SessionProvider>
            {/* <Box w="100%" h="1000px" bgGradient="radial(red.300, yellow.400, pink.200)" /> */}
            {/* <Box w="100%" h="1000px" bgColor="#F9F5F0" /> */}
            </ThemeProvider>
        </ChakraProvider>
    )
}

export default MyApp;