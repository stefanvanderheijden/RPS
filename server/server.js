const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const RpsGame = require('./rps-game')

const app = express();

const clientPath = `${__dirname}/../client`;
console.log('Serving static from ${clientPath}');

app.use(express.static(`../client`));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

io.on('connection', (sock) => {

    if (waitingPlayer) {
        //start a game
        
        new RpsGame(waitingPlayer,sock);       
        waitingPlayer = null;
    } else {
        waitingPlayer = sock;
        waitingPlayer.emit('message', 'waiting for an opponent');
    }

    sock.on('message', (text) => {
    //io.emit zend data naar alle verbonden sockets
        io.emit('message', text);
    });
});

server.on('error', (err) =>{
    console.error('Server error:', err);
})

server.listen(3000, () => {
    console.log('RPG Started')
})