import {Button, Heading, Link, VStack} from "@chakra-ui/react";
import React, {useState} from "react";
import {Calendar, DateObject} from "react-multi-date-picker"
import NextLink from "next/link";
import Navbar from "../components/navbar";
import {router} from "next/client";

function generateID(){
    const id = 234
    router.push(`/meeting/${encodeURIComponent(id)}`)
}

export default function New() {
    const oneWeek = new DateObject()
    oneWeek.day += 6
    const [dates, setDates] = useState([
        [new DateObject(), oneWeek],
    ])

    return (<>

        <Navbar/>
        <VStack>
            <Heading>Create a New Meeting</Heading>
            <Calendar
                // @ts-ignore
                value={dates}
                // @ts-ignore
                onChange={setDates}
                multiple
                range
            />
                <Button colorScheme='teal' variant='solid' data-cy='submit'
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
        </VStack>
    </>)
}
