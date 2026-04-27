import express from 'express'
import { SignIn, Logout, SignUp } from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post("/signup", SignUp)
authRouter.post("/login",SignIn)
authRouter.get("/logout",Logout)
export default authRouter;

