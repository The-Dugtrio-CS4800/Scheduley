import {Heading} from "@chakra-ui/react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { useState } from "react";
import {VStack} from "@chakra-ui/react";

export default function New(): JSX.Element {
    const [selectedDates, setSelectedDates] = useState<Date[]>([new Date(), new Date()]);

    return (
        <div>
            <VStack>
            <Heading>Create a New Meeting</Heading>
            <RangeDatepicker
                selectedDates={selectedDates}
                onDateChange={setSelectedDates}
                propsConfigs={{
                    dateNavBtnProps: {
                        colorScheme: 'blue',
                        variant: 'outline',
                    },
                    dayOfMonthBtnProps: {
                        defaultBtnProps: {
                            borderColor: 'red.300',
                            _hover: {
                                background: 'blue.400',
                            },
                        },
                        isInRangeBtnProps: {
                            color: 'purple.800',
                            borderColor: 'blue.300',
                        },
                        selectedBtnProps: {
                            background: 'blue.200',
                            borderColor: 'blue.300',
                            color: 'blue.600',
                        },
                        todayBtnProps: {
                            background: 'teal.200',
                            color: 'teal.700',
                        },
                    },
                    inputProps: {
                        size: 'sm',
                    },
                }}/>
            </VStack>
        </div>
    )
}
