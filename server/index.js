import connectToDB from "./db/connection.js";
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import http from "http"; 
import userRouter from "./routes/User.js";
import setupSocket from "./socket/index.js";
import messageRouter from "./routes/Message.js";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use('/user', userRouter);
app.use('/messages',messageRouter);

connectToDB();
setupSocket(server);

server.listen(8800, () => {
  console.log('Server started on port 8800');
});