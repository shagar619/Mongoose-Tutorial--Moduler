import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config";
import mongoose from "mongoose";
import routes from "./modules/routes";


const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);


app.get('/', (req: Request, res: Response) => {
    res.send({ success: true, message: `Sever is Live ⚡` });
});


async function server() {
    try {

        // Database connect
        await mongoose.connect(config.database_url!);
        console.log("Connected to MongoDB Using Mongoose!");

        app.listen(config.port, () => {
        console.log(`✅ Server running on port ${config.port}`);
    });

    } catch (error) {
    console.error('❌ Failed to start server:', error);
    }
}

server();