// External dependencies
import { ObjectId } from "mongodb";

type Participant = {
    name: string
    schedule: Date[]
}

// Class Implementation
export default class Meeting {
    constructor(public name: string, public title: string, public participants: Participant[], public dates: Date[], public id?: ObjectId) {}
}