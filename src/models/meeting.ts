// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Meeting {
    constructor(public name: string, public category: string, public id?: ObjectId) {}
}