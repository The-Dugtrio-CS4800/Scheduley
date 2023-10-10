import {Button, Heading, Link, VStack} from "@chakra-ui/react";
import React, {useState} from "react";
import {Calendar, DateObject} from "react-multi-date-picker"
import NextLink from "next/link";
import Navbar from "../components/navbar";

export default function New() {
    const oneWeek = new DateObject()
    oneWeek.day += 6
    const [values, setValues] = useState([
        [new DateObject(), oneWeek],
    ])

    return (<>

        <Navbar/>
        <VStack>
            <Heading>Create a New Meeting</Heading>
            <Calendar
                // @ts-ignore
                value={values}
                // @ts-ignore
                onChange={setValues}
                multiple
                range
            />
            <Link as={NextLink} href='/meeting/id'>
                <Button colorScheme='teal' variant='solid' data-cy='submit'
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
