// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Meeting {
    constructor(public name: string, public title: string, public participants: String[], public dates: Date[], public id?: ObjectId) {}
}