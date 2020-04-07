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

// Define player array, must be filled in connection function
let playerArray = [];

// If connected you receive an event called connection, with the object sock
// TODO: Player that enters the game at its name to array
io.on('connection', (sock) => {

    sock.on('playername', (personName) => {
            // Send to general chat
            io.emit('message', personName+' has entered the game');
            io.emit('message', sock.id)
            var clientIp = sock.request.connection.remoteAddress;
            io.emit('message','New connection from ' + clientIp);
            // Append to player array
            playerArray.push(personName);
        });

    // Displayer all players in chat, redundant function
    playerArray.forEach((person) => {
        io.emit('message',person+'is a player');
    });

    // if (playerArray.length == 10 ) {
    //     // Start a game   
    // }

    // Keep this here for test javascript
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

// Output error message if server crashes
server.on('error', (err) =>{
    console.error('Server error:', err);
})

// Start listening to this port
server.listen(3000, () => {
    console.log('RPG Started')
})