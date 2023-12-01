import {useRouter} from 'next/router'
import Navbar from "../../components/navbar";
import * as React from "react";
import {useEffect, useState} from "react";
import ScheduleSelector from 'react-schedule-selector'
import ScheduleViewer from "../../components/scheduleViewer";
import {Button, HStack, VStack} from "@chakra-ui/react";

export default function Meeting() {
    const router = useRouter()
    const [schedule, setSchedule] = useState([])
    const [scheduleViewer, setScheduleViewer] = useState([])
    const [participants, setParticipants] = useState([])
    const [startDate, setStartDate] = useState<Date>()

    useEffect(() => {
        const getDates = async (id) => {
            try {
                // add the meeting id to the url to fetch the object with that id
                const url = "http://localhost:8080/meeting/" + id
                // await fetch at the correct url with a get request
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                // store the result
                const result = await response.json();
                console.log("Success:", result);
                // get the start date of the meeting from the result
                const newStartDate = new Date(parseInt(result.dates[0]))
                setStartDate(newStartDate)
            } catch (error) {
                console.error("Error:", error);
                return false
            }

        }
        // prevent undefined query ids upon reload
        if (router.isReady){
            getDates(router.query.id).catch(console.error)
        }
    }, [router.isReady]);

    useEffect(() => {
        console.log(scheduleViewer);
        console.log(`Start Date:` + startDate)
    }, [scheduleViewer, startDate])

    function updateSchedule(){
        participants.push(
            {
                name: "name",
                schedule: schedule,
            }
        )
    }

    return <>{

        <div>
            <Navbar/>
            {router.query.id}
            <VStack >
                <HStack
                spacing ={50}>
                    {/*only show the schedule selector when the startDate has been initialized*/}
                    {startDate && <ScheduleSelector

                        selection={schedule}
                        startDate={startDate}
                        numDays={5}
                        minTime={8}
                        maxTime={22}
                        hourlyChunks={2}
                        timeFormat="h:mma"
                        onChange={setSchedule}
                    />}
                    <ScheduleViewer
                        selection={scheduleViewer}
                        selectionScheme={'square'}
                        numDays={5}
                        minTime={8}
                        maxTime={22}
                        hourlyChunks={2}
                        timeFormat="h:mma"
                        onChange={setScheduleViewer}
                        hoveredColor={'none'}
                        selectedColor={'blue'}
                        unselectedColor={'purple'}
                        participants={participants}
                    />
                    <Button
                        padding={5}
                        margin={5}
                        onClick={()=>{updateSchedule()
                            setScheduleViewer(schedule)
                            setSchedule([])}}
                    >
                        Add availability
                    </Button>
                </HStack>

            </VStack>
        </div>
    }</>;
}