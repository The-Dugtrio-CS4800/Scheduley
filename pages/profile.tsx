import Navbar from "../components/navbar";
import NextLink from 'next/link'
import {
    Box,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Flex,
    Heading,
    HStack,
    Input,
    Link,
    Stack,
    Text,
  } from '@chakra-ui/react'
  import { useSession, signOut,} from 'next-auth/react';

export default function Profile(){
  const Background = ({ children }: any) => (
    <Box
      display="flex"
      flex="1 1 auto"
      justifyContent="center"
      alignItems="center"
      backgroundImage="url('/homepage-bg.svg')" // coming from public folder
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

  const { data: session } = useSession();

    return(<>
        <Navbar/>
        <Background>
        

          {/* if you're adding to the navbar, only add within session ? if you want the component
          to show when the user is signed in */}
          {session ? (
            <>
            <HStack>
                  <Flex direction="column" justify="center">
                    <Heading color="#BF4A54"> Hello </Heading>
                  </Flex>
              <Box
              >
                <Heading color="black" as='h4' size='md'>{session?.user?.email} </Heading>

                <Flex direction="column" align="flex-start">
                {/* <Stack>
                    <Card key='outline' variant='outline'>
                      <CardHeader>
                        <Heading size='md'> Bio Study Session </Heading>
                      </CardHeader>
                      <CardBody>
                        <Text>
                          12/15/2023
                        </Text>
                      </CardBody>
                    </Card>
                </Stack> */}
                </Flex>
              </Box>

            </HStack>

              </>
          ) : (
              <>
              <Heading color="#BF4A54">
                Sign in to view your profile!
              </Heading>
            {/* <HStack as={'nav'} spacing={14} display={{ base: 'none', md: 'flex' }}>
                <Link color="black" as= {NextLink} href='/signIn'> Sign In </Link>
            </HStack> */}
              </>
          )}
        </Background>
        </>)

};