import Head from 'next/head';
import * as React from 'react'
import Navbar from "../components/navbar";

export default function Home(): JSX.Element {
    return (
            <div >
                <Head>
                    <title>Scheduley</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <Navbar/>
            </div>
    );
}
