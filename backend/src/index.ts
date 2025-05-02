import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";


const app = express();

// Middlewares
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Sample REST route
app.get("/", (req, res) => {
  res.json({
    waving: "hello from ICAA"
  });
});

// Routes
import userRouter from "./authentication/auth";
app.use('/api/v1/user', userRouter); 

// Handle WebSocket connection


const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server and WebSocket listening at http://localhost:${port}`);
});
