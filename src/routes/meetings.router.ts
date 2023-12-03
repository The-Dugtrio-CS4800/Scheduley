//External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Meeting from "../models/meeting";

// Global Config
export const meetingsRouter = express.Router();

meetingsRouter.use(express.json());

// GET
meetingsRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const meetings = (await collections.meetings.find({}).toArray());

        res.status(200).send(meetings);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

meetingsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const meeting = (await collections.meetings.findOne(query));

        if (meeting) {
            res.status(200).send(meeting);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST
meetingsRouter.post("/", async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const newMeeting = req.body as Meeting;
        const result = await collections.meetings.insertOne(newMeeting);

        result
            ? res.status(201).send({id: result.insertedId})
            : res.status(500).send({message: 'Failed to create a new meeting.'});
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT
meetingsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedMeeting: Meeting = req.body as Meeting;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.meetings.updateOne(query, { $set: updatedMeeting});

        result
            ? res.status(200).send(result)
            : res.status(304).send(`Meeting with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
meetingsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.meetings.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed meeting with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove meeting with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Meeting with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});