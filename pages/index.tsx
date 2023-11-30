import Head from 'next/head';
import * as React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "../components/navbar";

import MyApp from './_app'; // The root component of your application

// ReactDOM.render(
//   <Router>
//     <MyApp />
//   </Router>,
//   document.getElementById('root')
// );

export default function Home(): JSX.Element {
    return (
        <>
            <Head>
                <title>Scheduley</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Navbar/>
        </>
    );
}
