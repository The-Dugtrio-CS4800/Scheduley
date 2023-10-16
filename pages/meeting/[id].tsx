import {useRouter} from 'next/router'
import Navbar from "../../components/navbar";
import * as React from "react";
import {useState} from "react";
import ScheduleSelector from 'react-schedule-selector'
import {Box, Button, VStack} from "@chakra-ui/react";

export default function Meeting() {
    const router = useRouter()
    const [schedule, setSchedule] = useState([])

    return <>{
        <div>
            <Navbar/>
            {router.query.id}
            <Box m={25}>
            <VStack >
                <ScheduleSelector
                    selection={schedule}
                    numDays={5}
                    minTime={8}
                    maxTime={22}
                    hourlyChunks={2}
                    timeFormat="h:mma"
                    onChange={setSchedule}
                />
                <Button
                    onClick={() => {
                        (schedule.map((date) => {
                            console.log(date)
                        }))
                    }}
                >
                    Submit
                </Button>
            </VStack>
            </Box>
        </div>
    }</>;
}