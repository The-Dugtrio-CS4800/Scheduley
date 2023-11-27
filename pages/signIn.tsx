import { Input, Stack, Heading, InputGroup, InputLeftAddon, InputRightAddon, InputRightElement, Button} from '@chakra-ui/react'
import React, {useState} from "react";
import Link from 'next/link'
import Navbar from "../components/navbar";


export default function SignIn() {

    // function PasswordInput() {
    //     const [show, setShow] = React.useState(false)
    //     const handleClick = () => setShow(!show)

    return (<>

        <Navbar/>
        <Stack spacing={4}>
            <InputGroup>
                <InputLeftAddon children='Username' />
                <Input placeholder='jsmith' />
            </InputGroup>

            {/* <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup> */}

            {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
            <InputGroup size='sm'>
                <InputLeftAddon children='https://' />
                <Input placeholder='mysite' />
                <InputRightAddon children='.com' />
            </InputGroup>
        </Stack>    
    </>)
    // }
    
}

