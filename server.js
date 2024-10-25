const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs')

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('./public'));

let onlineCount = 1;

io.on('connection', (socket) => {
  console.log('user connected');
  let userID = Math.floor(Math.random() * 1000)
  io.emit('chat message', `>${userID} Logged in. Online: ${onlineCount}`)
  onlineCount++;
  console.log(userID)
  socket.on('disconnect', () => {
    console.log('User disconnected');
    onlineCount--;
    io.emit('chat message', `${userID} Logged out. Online: ${onlineCount}`)
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', `#${userID}: ${msg}`);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});