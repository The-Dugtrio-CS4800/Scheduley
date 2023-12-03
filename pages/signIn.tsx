// import { Input, Stack, Heading, InputGroup, InputLeftAddon, InputRightAddon, InputRightElement, Button} from '@chakra-ui/react'
// import React, {useState} from "react";
// import App from "../components/App";
// import Link from 'next/link'
// import Navbar from "../components/navbar";
import Navbar from "../components/navbar";
import type { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import Router from "next/router";
import { Field, Form, Formik } from "formik";

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
  import { useSession, signIn, signOut, getProviders} from 'next-auth/react';
  // import React, { useRef } from "react";

    

    const Background = ({ children }: any) => (
      <Box
        display="flex"
        flex="1 1 auto"
        justifyContent="center"
        alignItems="center"
        backgroundImage="url('/blob-scene-haikei.svg')" // coming from public folder
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundAttachment="fixed"
        width="100%"
        height="100%"
        color="white"
      >
        {children}
      </Box>
    );

    const SignIn: NextPage = ({providers}: any) => {
      const [authType, setAuthType] = useState("Login");
      const oppAuthType: { [key: string]: string } = {
        Login: "Register",
        Register: "Login",
      };
      const [username, setUsername] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

    const redirectToHome = () => {
      //route from /signIn to /
      const { pathname } = Router;
      if (pathname === "/signIn") Router.push("/");
    };

    const registerUser = async () => {
      // call register API
      //create register API
      const res = await axios.post("/api/register", {
        email,
        password
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }

      ).then(async () => {
        await loginUser();
        redirectToHome();
      })
      .catch((error) => console.log(error));

    };

    const loginUser = async () => {
      const res: any = signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
        callbackurl: `${window.location.origin}`
      })

      res.error ? console.log(res.error) : redirectToHome();
    };

    const formSubmit = () => {
      authType === "Login" ? loginUser() : registerUser();
    };

    return (<>

        <Navbar/>
        <Background>
          <Formik
            initialValues={{}} // { email: "", password: "" }
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(_, actions) => {
              formSubmit(actions);
            }}
          >
          {(props) => (
          <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading color="#BF4A54" size='lg'>{authType}</Heading>
              <Text color="black">
              {authType === "Login"
                ? "Not registered yet? "
                : "Already have an account? "}
                <button onClick={() => setAuthType(oppAuthType[authType])}>
                <Text as="u">{oppAuthType[authType]}</Text>
                </button>
              </Text>
            </Stack>
          </Stack>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: '#FFFFFF', sm: 'bg.surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <Stack spacing="3">
              <Stack spacing="3">
                <FormControl isRequired mb={6}>
                  <FormLabel color="black" htmlFor="username">Name:</FormLabel>
                  <Input color="black" id="username" type="username" onChange={(e) => setUsername(e.target.value)} placeholder="Name" />
                </FormControl>
                <FormControl isRequired mb={6}>
                  <FormLabel color="black" htmlFor="email">Email:</FormLabel>
                  <Input color="black" id="email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                </FormControl>
                <PasswordField />
              </Stack>
              <Stack spacing="6">
                <Button bg="#C55962" _hover={{ bg: "red.200" }} isLoading={props.isSubmitting}color="white" onClick={() => signIn()}>{authType}</Button>
                <HStack>
                  <Divider />
                  <Text color="black" textStyle="sm" whiteSpace="nowrap">
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
      )}
    </Formik>

          {/* <Formik
            initialValues={{}} // { email: "", password: "" }
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(_, actions) => {
              formSubmit(actions);
            }}
          >
            {(props) => (
              <Form style={{ width: "100%" }}>
                <Box display="flex" flexDirection="column" w="100%" mb={4}>
                  {authType === "Register"}
                  <Field name="email">
                    {() => (
                      <FormControl isRequired mb={6}>
                        <FormLabel htmlFor="email">Email:</FormLabel>
                        <Input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          background={"blue.600"}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {() => (
                      <FormControl isRequired mb={3}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="Password"
                          background={"blue.600"}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt={6}
                    bg="blue.400"
                    _hover={{ bg: "blue.200" }}
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    {authType}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik> */}
    </Background>
    </>)
  };

  export default SignIn;

