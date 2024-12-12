import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import userSignup from "./Routes/user.js";
import messages from "./Routes/message.route.js";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";
dotenv.config();

const port = process.env.PORT || 21652;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv config
// monodbConnecting
let mongodbUrl = process.env.MONOGODB_CONNECTION;
try {
  mongoose.connect(mongodbUrl);
  console.log("connect to MongoDB");
} catch (err) {
  console.error("index.js main error he " + err);
}

// Some helper middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "upload")));

// Routes Here
app.use("/api/users", userSignup);
app.use("/api/messages", messages);

// Listning on port
server.listen(port, () =>
  console.log(`listening on port http://localhost:${port}/`)
);
