// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Poll {
    constructor(public name: string, public title: string, public dateVotes: Map<Date, number> = new Map(), public id?: ObjectId) {}

    // Method to vote for a specific date
    voteForDate(date: Date): void {
        const currentVotes = this.dateVotes.get(date) || 0;
        this.dateVotes.set(date, currentVotes + 1);
    }

    // Method to get the votes for a specific date
    getVotesForDate(date: Date): number {
        return this.dateVotes.get(date) || 0;
    }
}
