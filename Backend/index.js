import express from 'express';
import dotenv  from 'dotenv';
dotenv.config()
// import { connect } from 'mongoose';
import connectDb from "./config/db.js"
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import geminiResponse from './gemini.js';


const app = express();
// app.use(cors({
//     origin:true,
//     credentials:true

// }));
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://ai-virtual-assistant-frontend-2026-bice.vercel.app"
    ],
    credentials: true
}));
const port =  process.env.PORT ||  8000
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


// app.get("/",async(req,res)=>{
//     let prompt = req.query.prompt
//  let data=  await geminiResponse(prompt)
//  res.json(data)
// })

app.listen(port,()=>{
  
    console.log("server started http://localhost:5000");
    connectDb()
})