import {Button, Heading, VStack} from "@chakra-ui/react";
import React, {useState} from "react";
import {Calendar, DateObject} from "react-multi-date-picker"

import Navbar from "../components/navbar";
import {useRouter} from "next/router";

async function generateID() {
    try {
        const response = await fetch("http://localhost:8080/meeting", {
            method: "POST", // or 'PUT'
            headers: {
                 "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "name"
            }),
        });

        const result = await response.json();
        console.log("Success:", result);
        return result.id;
    } catch (error) {
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
    let id;

    return (<>

        <Navbar/>
        <VStack spacing='5'>

            <Heading py={{ base: '6', md: '12' }}>Create a New Meeting</Heading>
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
                                    console.log(date.format())
                                })
                            })
                            id = await generateID();
                            router.push(`/meeting/${encodeURIComponent(id)}`)
                        }}>
                    Submit
                </Button>

        </VStack>
    </>)
}
