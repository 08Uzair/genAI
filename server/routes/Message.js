import express from 'express'
const messageRouter = express.Router();
import messageController from '../controllers/Message.js'

messageRouter.get("/:messageId", messageController.getMessagesByMessageId);
messageRouter.get("/last/:messageId", messageController.getLastMessageDetails);

export default messageRouter;