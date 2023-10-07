import {Button, Heading, Link} from "@chakra-ui/react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import {VStack} from "@chakra-ui/react";
import React, { useState } from "react";
import DatePicker, {Calendar, DateObject} from "react-multi-date-picker"
import type{Value} from "react-multi-date-picker"
import NextLink from "next/link";

export default function New(): JSX.Element {
    const [selectedDates, setSelectedDates] = useState<Date[]>([new Date(), new Date()]);
    const [values, setValues] = useState([
        [new DateObject().set({ day: 1 }), new DateObject().set({ day: 3 })],
        [new DateObject().set({ day: 6 }), new DateObject().set({ day: 12 })],
        [new DateObject().set({ day: 23 }), new DateObject().set({ day: 27 })],
    ])


    return (
        <div>
            <VStack>
            <Heading>Create a New Meeting</Heading>
                <Calendar
                    value={values}
                    onChange={setValues}
                    multiple
                    range
                />
                <Link as={NextLink} href='/meeting'>
                <Button colorScheme='teal' variant='solid'
                onClick = {()=> {values.map((dateList)=>{dateList.map((date)=>{console.log(date.format())})})}}>
                    Submit
                </Button>
                </Link>
            </VStack>
        </div>
    )
}
