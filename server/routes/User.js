import express from 'express'
const userRouter = express.Router();
import userController from '../controllers/User.js'
// Create a new blog
userRouter.post("/login", userController.signin);
userRouter.post("/signup", userController.signup);
userRouter.post("/create-conv", userController.createConversation);
userRouter.get("/:userId", userController.getUserById);
userRouter.get("/role/:role", userController.getUsersByRole);
userRouter.get("/", userController.getAllUsers);

export default userRouter;