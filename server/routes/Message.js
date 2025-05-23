import express from 'express'
const messageRouter = express.Router();
import messageController from '../controllers/Message.js'

messageRouter.get("/:messageId", messageController.getMessagesByMessageId);

export default messageRouter;