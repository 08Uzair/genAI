import express from "express";

const AIchatRouter = express.Router();
import { createAIchat, getAIChat } from "../controllers/AIchat.js";
AIchatRouter.post("/", createAIchat);
AIchatRouter.get("/", getAIChat);

// Export the router
export default AIchatRouter;