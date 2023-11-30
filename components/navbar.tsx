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

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const location = useLocation();
    // Check if the current location is not the home screen
    const isNotHome = location.pathname !== '/';
    
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
            {/* <Flex h={20} alignItems={'center'} justifyContent={'center'}>
                <img
                    src="meeting.png"
                    alt="Image Alt Text"
                    style={{ marginBottom: '10px', width: '250px', height: 'auto' }}
                />
                
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
            </Flex> */}

            <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: 'calc(100vh - heightOfNavbar)', // Replace heightOfNavbar with the actual height of your navbar
            boxSizing: 'border-box',
            paddingTop: 'heightOfNavbar' // Replace heightOfNavbar with the actual height of your navbar
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
    )
}

export default Navbar;

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
