'use client'

import {
    Box,
    Flex,
    Avatar,
    HStack,
    Image,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { useSession, signOut,} from 'next-auth/react';

interface Props {
    children: React.ReactNode
}

const Links = ['Sign Up', 'About Us']

const NavLink = (props: Props) => {
    const { children } = props
    return (
        <Box
            as="a"
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: '#7a2a30',
            }}
            href={'#'}>
            {children}
        </Box>
    )
}

export default function WithAction() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { data: session } = useSession();

    return (
        <>
            <Box bg= {useColorModeValue('#ffd9ce', '#ffd9ce')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                        <NextLink href="/">
                                {/* Assuming 'logo.png' is the path to your logo image */}
                                <Image src="/ScheduleyLogo.png" alt="Logo" boxSize="150px" objectFit="contain" />
                        </NextLink>
                        </Box>
                        {/* <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            <Link as= {NextLink} href='/signIn'> Sign In </Link>
                        </HStack> */}
                    </HStack>
                    <Flex alignItems={'center'}>
                        {/* if you're adding to the navbar, only add within session ? if you want the component
                        to show when the user is signed in */}
                        {session ? (
                            <>
                            <HStack spacing={3}>
                            <Text fontSize='sm'>
                                {session?.user?.email} <br />
                            </Text>
                            <Button onClick={() => signOut()}>Sign out</Button>

                            <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://i.pinimg.com/564x/9f/c8/76/9fc87619ef1efc19009f7ccc420634d1.jpg'
                                    }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <Link onClick={() => signOut()} as={NextLink} href='/'>
                                        Log Out                                    
                                    </Link>
                                </MenuItem>
                                {/* <MenuItem>Link 2</MenuItem>
                                <MenuDivider />
                                <MenuItem>Link 3</MenuItem> */}
                            </MenuList>
                        </Menu>
                        </HStack>

                            </>
                            //lines 116-121 are components that show if the user is NOT signed in
                        ) : (
                            <>
                            <HStack as={'nav'} spacing={14} display={{ base: 'none', md: 'flex' }}>
                            <Link as= {NextLink} href='/signIn'> Sign In </Link>
                            </HStack>
                            </>
                        )}
                 
                        <Menu>
                            {/* <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://i.pinimg.com/564x/9f/c8/76/9fc87619ef1efc19009f7ccc420634d1.jpg'
                                    }
                                />
                            </MenuButton> */}
                            <MenuList>
                                <MenuItem>
                                    <Link as={NextLink} href='/'>
                                        Log Out                                    
                                    </Link>
                                </MenuItem>
                                {/* <MenuItem>Link 2</MenuItem>
                                <MenuDivider />
                                <MenuItem>Link 3</MenuItem> */}
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}