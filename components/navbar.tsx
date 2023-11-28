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
import React from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
    children: React.ReactNode
}

const Links = ['Sign Up', 'About Us']

const NavLink = (props: Props) => {
    const { children } = props
    const location = useLocation();
    // Check if the current location is not the home screen
    const isNotHome = location.pathname !== '/';

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
            <Flex alignItems={'center'}>
            {isNotHome && (
                <div>
                {/* Your buttons here */}
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
                {/* ... other buttons */}
                </div>
            )}
            </Flex>
        </Box>
        
    )
}

export default function WithAction() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    
    
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
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {/* {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))} */}
                            <Link as= {NextLink} href='/signIn'>
                                {/* <NavLink>Sign In</NavLink> */} Sign In
                            </Link>
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
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


// function Navbar() {
//   const location = useLocation();

//   // Check if the current location is not the home screen
//   const isNotHome = location.pathname !== '/';

//   return (
//     <nav>
//       {/* Your navbar content here */}
      
//       {/* Conditionally render buttons if not on the home screen */}
//       {isNotHome && (
//         <div>
//           {/* Your buttons here */}
//           <button>Button 1</button>
//           <button>Button 2</button>
//           {/* ... other buttons */}
//         </div>
//       )}
//     </nav>
//   );
// }
