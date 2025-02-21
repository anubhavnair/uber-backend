import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import captainRouter from "./routes/captain.routes.js";
import userRouter from "./routes/user.routes.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectToDb from "./db/db.js";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.json());
connectToDb();
app.use("/api/captain", captainRouter);
app.use("/api/user", userRouter);

export default app;
