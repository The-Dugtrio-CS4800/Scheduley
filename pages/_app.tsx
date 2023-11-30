import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
// import { Providers } from "./auth/Providers";
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { Box } from "@chakra-ui/react"
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../components/navbar';

// function MyApp({ Component, pageProps }) {
//     return (
//         // <Providers>
//         <ChakraProvider>
//             <Component {...pageProps} />
//             {/* <Box w="100%" h="1000px" bgGradient="radial(red.300, yellow.400, pink.200)" /> */}
//             {/* <Box w="100%" h="1000px" bgColor="#F9F5F0" /> */}
//         </ChakraProvider>
//         // </Providers>
//     )
// }

const MyApp = () => {
    return (
        // <Providers>
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/other" component={OtherPage} />
            </Switch>
        </Router>
        
        // </Providers>
    )
}

export default MyApp;