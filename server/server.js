const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname,'../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'../public')));

io.on('connection',(socket) => {
    console.log('User connected!');

    socket.on('disconnect', () => {
        console.log('Disconnected from server.');
    });
});

server.listen(port, () => {
    console.log(`Server started on ${port}`);
});