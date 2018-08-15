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

    //Send welcome message to all users when they open chat app
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the Chat App!',
        createdAt: new Date().getTime()
    });

    //Send message to all other users when someone joins the chat app
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New User joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        // io.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server.');
    });
});

server.listen(port, () => {
    console.log(`Server started on ${port}`);
});