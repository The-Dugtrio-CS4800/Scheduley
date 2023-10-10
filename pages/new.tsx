import {Button, Heading, Link, VStack} from "@chakra-ui/react";
import React, {useState} from "react";
import {Calendar, DateObject} from "react-multi-date-picker"
import NextLink from "next/link";
import Navbar from "../components/navbar";

export default function New() {
    const [selectedDates, setSelectedDates] = useState<Date[]>([new Date(), new Date()]);
    const [values, setValues] = useState([
        [new DateObject().set({day: 1}), new DateObject().set({day: 3})],
        [new DateObject().set({day: 6}), new DateObject().set({day: 12})],
        [new DateObject().set({day: 23}), new DateObject().set({day: 27})],
    ])


    return (<>

        <Navbar/>
        <VStack>
            <Heading>Create a New Meeting</Heading>
            <Calendar
                value={values}
                onChange={setValues}
                multiple
                range
            />
            <Link as={NextLink} href='/meeting/id'>
                <Button colorScheme='teal' variant='solid'
                        onClick={() => {
                            values.map((dateList) => {
                                dateList.map((date) => {
                                    console.log(date.format())
                                })
                            })
                        }}>
                    Submit
                </Button>
            </Link>
        </VStack>
    </>)
}
