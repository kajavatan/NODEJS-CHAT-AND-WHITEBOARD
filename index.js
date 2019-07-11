var express = require('express');
var socket = require('socket.io');


var app = express();
port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log("Node app running at localhost:" + port);
});

app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);

io.on('connection', (socket) => {

    console.log('socket connection successful', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        // console.log(data);
        socket.broadcast.emit('typing', data);
    });

    socket.on('mouse', function(data){
        // console.log(data);
        socket.broadcast.emit('mouse', data);
    });

});