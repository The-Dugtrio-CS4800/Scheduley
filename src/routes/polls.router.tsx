//External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Poll from "../models/poll";

// Global Config
export const pollsRouter = express.Router();

pollsRouter.use(express.json());

// GET
pollsRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const polls = (await collections.polls.find({}).toArray()) as Poll[];

        res.status(200).send(polls);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

pollsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const poll = (await collections.polls.findOne(query)) as Poll;

        if (poll) {
            res.status(200).send(poll);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST
pollsRouter.post("/", async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const newPoll = req.body as Poll;
        const result = await collections.polls.insertOne(newPoll);

        result
            ? res.status(201).send({id: result.insertedId})
            : res.status(500).send({message: 'Failed to create a new poll.'});
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT
pollsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedPoll: Poll = req.body as Poll;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.polls.updateOne(query, { $set: updatedPoll});

        result
            ? res.status(200).send(`Successfully updated poll with id ${id}`)
            : res.status(304).send(`Poll with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
pollsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.polls.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed poll with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove poll with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Poll with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});