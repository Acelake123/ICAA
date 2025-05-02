import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";

import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

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

// Create a single HTTP server from Express app
const server = http.createServer(app);

// Attach WebSocket server to same HTTP server
const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    // Broadcast to all clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send('Hello! Message From Server!!');
});

const port = process.env.PORT || 3002;
server.listen(port, () => {
  console.log(`Server and WebSocket listening at http://localhost:${port}`);
});
