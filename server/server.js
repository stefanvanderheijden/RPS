// List all requires modules using const <name> = require('')
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const RpsGame = require('./rps-game')

// Express library provides you with features for web and mobile application
// Create a listener
const app = express();

// Load file from client.js file, __dirname defined in nodejs
const clientPath = `${__dirname}/../client`;
console.log('Serving static from ${clientPath}');
app.use(express.static(clientPath));

// Create the server from http object
const server = http.createServer(app);

// Create socketio server
const io = socketio(server);

let waitingPlayer = null;

<<<<<<< HEAD
=======

// If connected you receive an event called connection, with the object sock
>>>>>>> feature/testumit
io.on('connection', (sock) => {

    if (waitingPlayer) {
        //start a game
        
        new RpsGame(waitingPlayer,sock);

        // Onderstaande regels zijn samengevoegd in daaronderstaande array functie
        //sock.emit('message', 'Game Starts!');
        //waintingPlayer.emit('message', 'Game Starts!');

        
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

// Output error message if server crashes
server.on('error', (err) =>{
    console.error('Server error:', err);
})

// Start listening to this port
server.listen(3000, () => {
    console.log('RPG Started')
})