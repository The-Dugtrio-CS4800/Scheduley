import Head from 'next/head';
import * as React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "../components/navbar";
import {
    Button,
    Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {AddIcon } from '@chakra-ui/icons'

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
            <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: 'calc(100vh - heightOfNavbar)', // Replace heightOfNavbar with the actual height of your navbar
            boxSizing: 'border-box',
            paddingTop: 'heightOfNavbar' // Replace heightOufNavbar with the actual height of your navbar
            }}>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 10px' // Adds spacing between the combos
            }}>
                <img src="meeting.png" alt="New meeting sample" style={{ display: 'block', width: '250px', height: 'auto', marginBottom: '10px' }} />
                <Link as={NextLink} href='/new'>
                    <Button color='white'
                        variant={'solid'}
                        bg={'#c14953'}
                        size={'sm'}
                        mr={4}
                        leftIcon={<AddIcon />}>
                        New Meeting
                    </Button>
                </Link>
            </div>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 10px' // Adds spacing between the combos
            }}>
                <img src="meeting.png" alt="New poll sample" style={{ display: 'block', width: '250px', height: 'auto', marginBottom: '10px' }} />
                <Link as={NextLink} href='/poll'>
                <Button color='white'
                    variant={'solid'}
                    bg={'#c14953'}
                    size={'sm'}
                    mr={4}
                    leftIcon={<AddIcon/>}>
                    New Poll
                </Button>
                </Link>
            </div>
            </div>
        </>
    );
}
