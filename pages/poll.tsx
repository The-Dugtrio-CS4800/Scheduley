import {Button, Heading, VStack} from "@chakra-ui/react";
import React, {useState} from "react";
import {Calendar, DateObject} from "react-multi-date-picker"
import Link from 'next/link'
import Navbar from "../components/navbar";

function generateID(){
    const id = 234
    return id;
}

export default function New() {
    const oneWeek = new DateObject()
    oneWeek.day += 6
    const [dates, setDates] = useState([
        [new DateObject(), oneWeek],
    ])

    return (<>

        <Navbar/>
        <VStack spacing='5'>
            
            <Heading py={{ base: '6', md: '12' }}>Create a New Poll</Heading>
            <Calendar
                // @ts-ignore
                value={dates}
                // @ts-ignore
                onChange={setDates}
                multiple
                range
            />
                <Link href={`/meeting/${encodeURIComponent(generateID())}`}>
                <Button variant='solid' color='white' data-cy='submit' bg={'#c14953'}
                        onClick={() => {
                            dates.map((dateList) => {
                                dateList.map((date) => {
                                    console.log(date.format())
                                })
                            })
                            generateID()
                        }}>
                    Submit
                </Button>
                </Link>
        </VStack>
    </>)
}
