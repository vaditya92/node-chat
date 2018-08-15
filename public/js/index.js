var socket = io();
socket.on('connect',function () {
    console.log('Connected');

    socket.emit('createMessage', {
        from:'Aditya',
        text:'All Good!'
    });
});
socket.on('disconnect',function () {
    console.log('Disconnected');
});

socket.on('newMessage',function (message) {
    console.log('New Message', message);
});