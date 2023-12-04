import {useRouter} from 'next/router'
import Navbar from "../../components/navbar";
import * as React from "react";
import {useEffect, useState} from "react";
import ScheduleSelector from 'react-schedule-selector'
import ScheduleViewer from "../../components/scheduleViewer";
import {Button, HStack, Input, VStack} from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'

const updateSchedule = async(id, participant, dates) => {

    const getResponse = await fetch("http://ec2-18-189-28-104.us-east-2.compute.amazonaws.com:8080/meeting/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    // store the result
    const result = await getResponse.json();
    console.log("Success:", result);
    if (result.participants) {
        result.participants.push({
            name: participant,
            schedule: dates
        })
    } else {
        result.participants = [{
            name: participant,
            schedule: dates
        }]
    }

    const putResponse = await fetch("http://ec2-18-189-28-104.us-east-2.compute.amazonaws.com:8080/meeting/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            participants: result.participants
        }),
    });
    const putResult = await putResponse.json();
    console.log("Success:", putResult);
    const getResponseAfterPut = await fetch("http://ec2-18-189-28-104.us-east-2.compute.amazonaws.com:8080/meeting/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    // store the result
    const getPutResult = await getResponseAfterPut.json();
    console.log("Success:", getPutResult);
    getPutResult.participants.map((participant) => {
        console.log("mapping participant name:" + participant)
        for (let index = 0; index < participant.schedule.length; index++) {
            console.log("mapping date:" + participant.schedule[index])
            participant.schedule[index] = new Date(JSON.parse(JSON.stringify(participant.schedule[index])))
        }
    })
    console.log(getPutResult.participants)
    return getPutResult.participants
}

export default function Meeting() {
    const router = useRouter()
    const [schedule, setSchedule] = useState([])
    const [scheduleViewer, setScheduleViewer] = useState([])
    const [participants, setParticipants] = useState([])
    const [startDate, setStartDate] = useState<Date>()
    const [numDays, setNumDays] = useState(5)
    const [activeParticipant, setActiveParticipant] = useState(null)
    const [name, setName] = useState("")
    const [meetingName, setMeetingName] = useState("")
    const [allParticipants, setAllParticipants] = useState(true)
    const [hoveredDate, setHoveredDate] = useState(null)
    const [meetingID, setMeetingID] = useState(null)

    useEffect(() => {
        const getDates = async (id) => {
            try {
                // add the meeting id to the url to fetch the object with that id
                const url = "http://ec2-18-189-28-104.us-east-2.compute.amazonaws.com:8080/meeting/" + id
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
                const newStartDate = new Date(parseInt(result.dates[0][0]))
                const endDate = new Date(parseInt(result.dates[0][1]))
                const time_difference = endDate.getTime() - newStartDate.getTime()
                const days_difference = Math.ceil(time_difference / (1000 * 60 * 60 * 24))
                setStartDate(newStartDate)
                setNumDays(days_difference+1)
                setMeetingName(result.name)
                if (!result.hasOwnProperty('participants')){
                    result.participants.map((participant) => {
                        console.log("mapping participant name:" + participant)
                        for (let index = 0; index < participant.schedule.length; index++) {
                            console.log("mapping date:" + participant.schedule[index])
                            participant.schedule[index] = new Date(JSON.parse(JSON.stringify(participant.schedule[index])))
                        }
                    })
                }
                setParticipants(result.participants)
            } catch (error) {
                console.error("Error:", error);
                return false
            }

        }
        // prevent undefined query ids upon reload
        if (router.isReady){
            getDates(router.query.id).catch(console.error)
            setMeetingID(router.query.id)
        }
    }, [router.isReady]);

    // if a specific participant is selected, display that schedule
    useEffect(() => {
        if (activeParticipant) {
            setScheduleViewer(activeParticipant.schedule)
            setAllParticipants(false)
        }
    }, [activeParticipant])

    // if all participants want to be shown, display them
    useEffect(() => {
        if (allParticipants) {
            setActiveParticipant(null)
            setScheduleViewer([])
        }
    }, [allParticipants])

    // handle hovering date change
    const handleHoverChange = (date) => {
        setHoveredDate(date)
    }
    useEffect(() => {
        console.log("participants" + participants)
    }, [participants])




    return <>{

        <div>
            <Navbar/>
            <VStack >
                <Text>{meetingName}</Text>
                <HStack
                spacing ={50}>
                    <VStack>
                    <Text>Choose Availability</Text>
                    {/*only show the schedule selector when the startDate has been initialized*/}

                    {startDate && numDays &&<ScheduleSelector

                        selection={schedule}
                        startDate={startDate}
                        numDays={numDays? numDays : 5}
                        minTime={8}
                        maxTime={22}
                        hourlyChunks={2}
                        timeFormat="h:mma"
                        onChange={setSchedule}
                        columnGap={'4px'}
                        rowGap={'4px'}
                    />}
                    </VStack>
                    <VStack>
                        {/*display all availibility or person's name text*/}
                        {activeParticipant ? <Text>{activeParticipant.name}'s Availibility</Text> : <Text>All Participants</Text> }
                    <ScheduleViewer
                        onHoverChange={handleHoverChange}
                        selection={scheduleViewer}
                        startDate={startDate}
                        numDays={numDays? numDays : 5}
                        minTime={8}
                        maxTime={22}
                        hourlyChunks={2}
                        timeFormat="h:mma"
                        onChange={setScheduleViewer}
                        hoveredColor={'none'}
                        selectedColor={`hsl(157, 59%, 50%)`}
                        unselectedColor={'grey'}
                        participants={participants}
                        allParticipants={allParticipants}
                        rowGap = {'2px'}
                        columnGap = {'4px'}
                    />
                    </VStack>
                    <VStack>
                        {/* display who is available on the hovered date*/}
                        {hoveredDate && <VStack>
                            <Text>Available:</Text>
                            {participants.filter(
                                (participant) => participant.schedule.find(
                                    item => {
                                        return new Date(JSON.parse(JSON.stringify(item))).getTime() == hoveredDate.getTime()
                                    })).map(participant =>(
                                <Text> {participant.name}</Text>
                            ))}
                        </VStack>}
                        {/*display all participants button*/}
                        <Button
                            background = 'none'
                            _hover={{ bg: 'none' }}
                            _focus={{
                                bg: 'none',
                                color: 'blue',
                            }}
                            onClick = {()=>{
                                setAllParticipants(true)
                            }}
                        > See all availabilities</Button>
                        {/* create a button for each participant*/}
                        {participants.map(participant =>(
                            <Button
                                background = 'none'
                                _hover={{ bg: 'none' }}
                                _focus={{
                                    bg: 'none',
                                    color: 'blue',
                                }}
                                onClick = {()=>{
                                    setActiveParticipant(participant)
                                }}
                            > {participant.name}</Button>
                            ))
                        }
                    </VStack>
                </HStack>
                <HStack>
                {/* input particpant name*/}
                <Input
                    value ={name}
                    onChange = {(e) => setName(e.target.value)}
                    placeholder='Enter name'
                    size='sm'
                />
                    <Button
                        padding={5}
                        margin={5}
                        onClick={async ()=>{
                            setParticipants(await updateSchedule(meetingID, name, schedule))
                            setSchedule([])}}
                    >
                        Add availability
                    </Button>

                </HStack>
            </VStack>
        </div>
    }</>;
}