import Head from 'next/head';
import * as React from 'react'
import Navbar from "../components/navbar";
import {
    Button,
    Container,
    Divider,
    Link,
    Flex,
    Box,
    Stack,
    Heading,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {AddIcon } from '@chakra-ui/icons'

export default function Home(): JSX.Element {
    
    const Background = ({ children }: any) => (
        <Box
          display="flex"
          flex="1 1 auto"
          justifyContent="center"
          alignItems="center"
          backgroundImage="url('homepage-bg.svg')" // coming from public folder
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          backgroundAttachment="fixed"
          width="100%"
          height="100vh"
          color="white"
        >
          {children}
        </Box>
      );
    return (
        <>
            <Head>
                <base href="/" />
                <title>Scheduley</title>
                <link rel="icon" font-size="30" href="/ScheduleyIcon.png"/>
            </Head>

            <Navbar/>
            <Background>
            <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: 'calc(100vh - heightOfNavbar)', // Replace heightOfNavbar with the actual height of your navbar
            boxSizing: 'border-box',
            paddingTop: 'heightOfNavbar' // Replace heightOufNavbar with the actual height of your navbar
            }}>
            <Flex
            align="center"
            justify="center"
            >
                <Box textAlign="center">
                    <Heading color="#BF4A54" as='h1' size='3xl' mb={8}>
                        Welcome to Scheduley!
                    </Heading>
                    <Heading color="#3D1800" as='h4' size='md'>
                        Plan your next meeting with participant availability view and email notification features
                    </Heading>
                </Box>
            </Flex>
            {/* <div style={{ 
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
            </div> */}
            {/* <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 10px' // Adds spacing between the combos
            }}>
                <img src="meeting.png" alt="New poll sample" style={{ display: 'block', width: '250px', height: 'auto', marginBottom: '10px' }} />
                <Link as={NextLink} href='/newPoll'>
                <Button color='white'
                    variant={'solid'}
                    bg={'#c14953'}
                    size={'sm'}
                    mr={4}
                    leftIcon={<AddIcon/>}>
                    New Poll
                </Button>
                </Link>
            </div> */}
            </div>
            </Background>
        </>
    );
}