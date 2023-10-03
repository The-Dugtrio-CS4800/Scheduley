import Head from 'next/head';
import * as React from 'react'
import {ChakraProvider} from '@chakra-ui/react'
import Navbar from "../components/navbar";

export default function Home() {
    return (
        <ChakraProvider>
            <div >
                <Head>
                    <title>Scheduley</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <Navbar/>




            </div>
        </ChakraProvider>
    );
}
