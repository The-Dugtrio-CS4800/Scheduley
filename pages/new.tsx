import {
    Button,
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
        const response = await fetch("http://localhost:8080/meeting/", {
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
        <VStack spacing='5'>

            <Heading py={{ base: '6', md: '12' }}>Create a New Meeting</Heading>
            <Input
                value ={name}
                onChange = {(e) => setName(e.target.value)}
                placeholder='Enter Meeting Name'
                size='sm'
            />
            <Input
                value ={email}
                onChange = {(e) => setEmail(e.target.value)}
                placeholder='Enter Your Email for Notifications (optional)'
                size='sm'
            />
            <Text>Send an email when this many people have added their availability:</Text>
            <NumberInput defaultValue={5} min={1} max={20}
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
    </>)
}
