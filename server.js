const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  const server = http.createServer(app);

  const wss = new WebSocket.Server({ server });
  
  wss.on('connection', (ws) => {
    console.log('New client connected');
  
    ws.on('message', (message) => {
      console.log(`Received: ${message}`);
      ws.send(`Server received: ${message}`);
    });
  
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
  
  // เริ่ม server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });