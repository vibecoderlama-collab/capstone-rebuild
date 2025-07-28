const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../frontend')))
const PORT = 3000;
const server = http.createServer(app);
const webSocetServer = new WebSocket.Server({ server });

webSocetServer.on('connection', (ws) => {
  // A new client has connected
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received message => %s', message);
    // Broadcast the message to all clients
    webSocetServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    // A client has disconnected
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
})