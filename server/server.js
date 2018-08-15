const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'../public')));

io.on('connection',(socket) => {
    console.log('User connected!');

    //Send welcome message to all users when they open chat app
    socket.emit('newMessage', generateMessage ('Admin','Welcome to the Chat App!'));

    //Send message to all other users when someone joins the chat app
    socket.broadcast.emit('newMessage', generateMessage('Admin','New User joined'));

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from,message.text));
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server.');
    });
});

server.listen(port, () => {
    console.log(`Server started on ${port}`);
});