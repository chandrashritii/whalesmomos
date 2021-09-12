
const express = require('express')

//App Setup
const app = express()
const server= require('http').createServer(app)
server.listen(4000,function(){
    console.log("port 4000");
});


const io = require('socket.io')(server)

//Static files
app.use(express.static('public'));

// Connection making
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});