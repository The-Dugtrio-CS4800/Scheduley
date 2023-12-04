import {
    Button,
    Box,
    Container,
    Heading,
    Input,
    NumberDecrementStepper, NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    VStack
} from "@chakra-ui/react";
import React, {useState} from "react";
import {Calendar, DateObject} from "react-multi-date-picker"

import Navbar from "../components/navbar";
import {useRouter} from "next/router";

async function generateMeeting(name, dates, email, emailNumber) {
    try {
        const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8080/meeting`, {
            method: "POST",
            headers: {
                 "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: name,
                dates: dates,
                email: email,
                emailNumber: emailNumber
            }),
        });

        const result = await response.json();
        //console.log("Success:", result);
        return result.id;
    } catch (error) {
        // return random value for now, this should prevent you from proceeding later
        console.error("Error:", error);
        return 999
    }

}

export default function New() {
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
        //   color="white"
        >
          {children}
        </Box>
      );

    const router = useRouter()
    const oneWeek = new DateObject()
    oneWeek.day += 6
    const [dates, setDates] = useState([
        [new DateObject(), oneWeek],
    ])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [emailNumber, setEmailNumber] = useState(5)
    let id;

    return (<>

        <Navbar/>
        {/* <Background> */}
        <VStack>
            <Heading color="#BF4A54" py={{ base: '3', md: '5' }}>Create a New Meeting</Heading>
            {/* <Box color="white"> */}
            <Container>
            <Input
                value ={name}
                color="black"
                onChange = {(e) => setName(e.target.value)}
                placeholder='Enter Meeting Name'
                size='sm'
            />
            <Input
                value ={email}
                color="black"
                onChange = {(e) => setEmail(e.target.value)}
                placeholder='Enter Your Email for Notifications (optional)'
                size='sm'
            />
            {/* </Box> */}
            </Container>
            <Text color="black">Send an email when this many people have added their availability:</Text>
            <NumberInput color="black" defaultValue={5} min={1} max={20}
                         onChange={(num) => setEmailNumber(parseInt(num))}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Calendar
                // @ts-ignore
                value={dates}
                // @ts-ignore
                onChange={setDates}
                multiple
                range
            />

                <Button variant='solid' color='white' data-cy='submit' bg={'#c14953'}
                        onClick={async () => {
                            dates.map((dateList) => {
                                dateList.map((date) => {
                                    //console.log(date.format())
                                })
                            })
                            id = await generateMeeting(name, dates, email, emailNumber);
                            await router.push(`/meeting/${encodeURIComponent(id)}`)
                        }}>
                    Submit
                </Button>

        </VStack>
        {/* </Background> */}
    </>)
}
