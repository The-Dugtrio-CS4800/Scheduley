import Navbar from "../components/navbar";
import axios from "axios";
import Router from "next/router";
import { Field, Formik } from "formik";

import {
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Flex,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
  } from '@chakra-ui/react'
  import { signIn } from 'next-auth/react';
  import { GitHubIcon } from '../components/ProviderIcons'

    interface FormModel{
      username: string,
      email: string,
      password: string
    }
    export default function SignIn() {
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

      const [authType, setAuthType] = useState("Login");
      const oppAuthType: { [key: string]: string } = {
        Login: "Register",
        Register: "Login",
      };

      const providers = [
      { name: 'GitHub', icon: <GitHubIcon /> },
      ]

      const ProvidersButtons = ({ providers }: any) => (
        <Flex direction="column" w="100%">
          {Object.values(providers).map(
            (provider: any) =>
              provider.name !== "Credentials" && (
                <Button
                  key={provider.name}
                  mb={4}
                  bg={"#24292E"}
                  color={"white"}
                  _hover={{ bg: "#24292E90" }}
                  type="submit"
                  onClick={() => {
                    signIn(provider.id, {
                      callbackUrl: `${window.location.origin}`,
                    });
                  }}
                >
                  <Box>Sign in with {provider.name}</Box>
                </Button>
              )
          )}
        </Flex>
      );

    const redirectToHome = () => {
      //route from /signIn to /
      const { pathname } = Router;
      if (pathname === "/signIn") Router.push("/");
    };

    const registerUser = async (values: FormModel) => {
      // call register API
      //create register API
      try {
        const res = await axios.post("/api/register", values, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        await loginUser(values);
        redirectToHome();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };


    const loginUser = async (values : FormModel) => {
      const res: any = signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackurl: `${window.location.origin}`
      })

      res.error ? console.log(res.error) : redirectToHome();
    };

    const formSubmit = (values : FormModel, actions : any) => {
      actions.setSubmitting(false);
      authType === "Login" ? loginUser(values) : registerUser(values);
    };

    return (<>
        <Navbar/>
        <Background>
        <Formik<FormModel>
            initialValues={{ username: "", email: "", password: ""}} // { email: "", password: "" }
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, actions) => {
              formSubmit(values, actions);
              console.log({values, actions});
            }}
          >
          {({handleSubmit, values, handleChange}) => (
          <form onSubmit={handleSubmit}>
          {/* <Form> */}
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
                {authType === "Register" && (
                  <Field name="name">
                    {() => (
                    <FormControl isRequired mb={6}>
                    <FormLabel color="black" htmlFor="name">Name:</FormLabel>
                    <Input color="black" id="username" type="text" name="username" placeholder="Name" value={values.username} onChange={handleChange}/>
                    </FormControl>
                    )}
                  </Field>
                )}
                <Field name="email">
                  {() => (
                    <FormControl isRequired mb={6}>
                      <FormLabel color="black" htmlFor="email">Email:</FormLabel>
                      <Input color="black" id="email" type="text" name="email" placeholder="Email Address" value={values.email} onChange={handleChange}/>
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {() => (
                    <FormControl isRequired mb={6}>
                    <FormLabel color="black" htmlFor="password">Password</FormLabel>
                    <Input color="black" id="password" type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange}/>
                    </FormControl>
                  )}
                </Field>
              </Stack>

              <Stack spacing="6">
                <Button bg="#C55962" _hover={{ bg: "red.200" }} color="white" type="submit">{authType}</Button>
                <HStack>
                  <Divider />
                  <Text color="black" textStyle="sm" whiteSpace="nowrap">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <ProvidersButtons providers={providers} />
              </Stack>
            </Stack>
          </Box>
          </Stack>
        </Container>
        </form>
    )}
          </Formik>
        </Background>
    </>
  );
};

