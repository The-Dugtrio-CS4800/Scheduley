import express from "express";
import cors from 'cors';
import { connectToDatabase } from "./services/database.service"
import { meetingsRouter } from "./routes/meetings.router";
//import { usersRouter } from "./routes/users.router";

const app = express();
const port = process.env.PORT || '8080'; // default port to listen

connectToDatabase()
    .then(() => {
        const allowedOrigins = ['*'];

        const options: cors.CorsOptions = {
            origin: allowedOrigins
        };

        app.use(cors());

        app.use("/meeting", meetingsRouter);
        //app.use("/user", usersRouter);

        app.listen(port, () => {
            console.log(`Server started at http://ec2-18-189-28-104.us-east-2.compute.amazonaws.com:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });