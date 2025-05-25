import express from "express";


const suggestionRouter = express.Router();
import { createSuggestion, getSuggestion } from "../controllers/Suggestion.js";

// Route to create a suggestion
suggestionRouter.post("/", createSuggestion);
// Route to get a suggestion by messageId
suggestionRouter.get("/:messageId", getSuggestion);

// Export the router
export default suggestionRouter;