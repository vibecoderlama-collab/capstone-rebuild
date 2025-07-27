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

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
})