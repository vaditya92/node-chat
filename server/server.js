const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validations');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname,'../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
var users = new Users();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'../public')));

io.on('connection',(socket) => {
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room is required!');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUsers',users.getUserList(params.room));
        //Send welcome message to all users when they open chat app
        socket.emit('newMessage', generateMessage ('Admin','Welcome to the Chat App!'));
        //Send message to all other users when someone joins the chat app
        socket.to(params.room).broadcast.emit('newMessage', generateMessage('Admin',`${params.name} has joined.`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from,message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude))
    })

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUsers', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left.`));
        }
        console.log('Disconnected from server.');
    });
});

server.listen(port, () => {
    console.log(`Server started on ${port}`);
});