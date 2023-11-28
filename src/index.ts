import express from "express";
import cors from 'cors';
import { connectToDatabase } from "./services/database.service"
import { meetingsRouter } from "./routes/meetings.router";

const app = express();
const port = 8080; // default port to listen

connectToDatabase()
    .then(() => {
        const allowedOrigins = ['http://localhost:3000'];

        const options: cors.CorsOptions = {
            origin: allowedOrigins
        };

        app.use(cors(options));

        app.use("/meeting", meetingsRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });