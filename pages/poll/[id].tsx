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


    useEffect(() => {
        console.log(scheduleViewer);
    }, [scheduleViewer])

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
                    <ScheduleSelector
                        selection={schedule}
                        numDays={5}
                        minTime={8}
                        maxTime={22}
                        hourlyChunks={2}
                        timeFormat="h:mma"
                        onChange={setSchedule}
                    />
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