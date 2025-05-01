
import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";


const app = express()

app.use(cors({
    origin: "*",
    credentials: true
  }));
  
  app.use(cookieParser());
  app.use(express.json({ limit: '10mb' })); // 10MB limit for JSON
  app.use(express.urlencoded({ extended: false, limit: '10mb' })); // 10MB limit for URL-encoded
  
  

const port = process.env.PORT || 3002

app.get("/", (req,res)=>{
    res.json({
        waving:"hello from ICAA"
    })
})

import userRouter from "./authentication/auth";

app.use('/api/v1/user', userRouter); 

app.listen(port,()=>{
    console.log(`the server is listenin on the port http://localhost:${port}`);
})

