// import { Input, Stack, Heading, InputGroup, InputLeftAddon, InputRightAddon, InputRightElement, Button} from '@chakra-ui/react'
// import React, {useState} from "react";
// import App from "../components/App";
// import Link from 'next/link'
// import Navbar from "../components/navbar";
import Navbar from "../components/navbar";

import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link,
    Stack,
    Text
  } from '@chakra-ui/react'
  import { OAuthButtonGroup } from '../components/OAuthButtonGroup'
  import { PasswordField } from '../components/PasswordField'
  import { useSession, signIn, signOut } from 'next-auth/react';
  // import React, { useRef } from "react";


export default function SignIn() {
    const { data: session } = useSession()
    if (session) {
      return (
        <>
        <Navbar/>
          Signed in as {session?.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )
    }

    return (<>

        <Navbar/>
        {/* Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button> */}
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
            <Text color="fg.muted">
              Don't have an account? <Link href="#">Sign up</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email " />
              </FormControl>
              <PasswordField/>
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="text" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button onClick={() => signIn()}>Sign in</Button>
              <HStack>
                <Divider />
                <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
    </>)
    
}

