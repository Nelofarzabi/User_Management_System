import express, { Application } from 'express';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes';
import path from 'path';
import config from './config/config';
import cors from "cors";
dotenv.config();

const app = express();
const port = config.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.options("*", cors());

app.use('/api/v1', router);

// app.use((req, res, next) => {
//     next(new Error("Route Not found"));
// });

// Fallback for unhandled routes
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Route Not found" });
});

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);  // Logs the error for debugging
    res.status(500).json({ message: "Server Error" });
});
export default app;
