import express from 'express'
import { getCurrentuser, updateAssistant , askToAssistant } from '../controllers/user.controller.js'
import isAuth from '../middlewares/isAuth.js';
import upload from '../middlewares/multer.js';


const userRouter = express.Router()

userRouter.get("/current", isAuth, getCurrentuser)
userRouter.post("/update", isAuth, upload.single("assistantImage"),updateAssistant)
userRouter.post("/asktoassistant", isAuth,askToAssistant)


export default userRouter;

