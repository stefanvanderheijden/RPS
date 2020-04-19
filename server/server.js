// List all requires modules using const <name> = require('')
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const Player = require('./player')
const RpsGame = require('./rps-game')
const SHGame = require('./SH-game-logic')

// Express library provides you with features for web and mobile application
// Create a listener
const app = express();

// Load file from client.js file, __dirname defined in nodejs
const clientPath = `${__dirname}/../client`;
console.log('Serving static from ${clientPath}');
app.use(express.static(clientPath));

// Create the server from http object
const server = http.createServer(app);

var gameStarted = false;

// Create socketio server
const io = socketio(server);

let waitingPlayer = null;

// Define player array, must be filled in connection function
let playerArray = [];
let leanPlayerArray = [];

function UpdatePlayerArray(player) {
    playerArray.push(player);   
    // create a new lean player object (dictionary)
    leanPlayer = {name : player._name, seatnr : player._seatnr, identity : player._identity, party : player._party, emotion : 0};
    // add this lean player to the leanplayer array
    leanPlayerArray.push(leanPlayer);
    // send this lean player to all the clients (not the full array)
    io.emit('clientArrayUpdate', leanPlayer)
}

function SendFullPlayerArray(player) {
    //send the full array to the new play er, so he has all the info
    player._socket.emit("getPlayerArray",leanPlayerArray);

}

function SendToAllPlayers(message) {
    io.emit('message', message);
}

// If connected you receive an event called connection, with the object sock
io.on('connection', (sock) => {
    sock.on('playername', (personName) => {
            // Send to general chat
            io.emit('message', personName+' has entered the game');
            
            // If player array is empty, immediately add new player
            if (playerArray.length == 0){
                // Create tmp player object and add to array
                let player_tmp = new Player(personName,1, sock)
                // Send this new player to all clients
                UpdatePlayerArray(player_tmp);
                // Send the full player array list to the new client
                SendFullPlayerArray(player_tmp);
                // Initiate the starting function for the new client
                sock.emit("start");
                // Send the full player array list to the new client

            } else {
                // If playerarray is nonzero length, first check if given name already exists
                let playerExists = false;
                playerArray.forEach((player) => {
                    // If one of the names corresponds to the name field of the player, update socket
                    if (player._name == personName){
                        player._updateSocket(sock);
                        playerExists = true;
                        sock.emit("message", "Welkom back "+ personName);
                        // The client needs to get the full array of players because he reloaded
                        SendFullPlayerArray(player);
                        // Initiate the starting function for the new client
                        sock.emit("start");
                    
                    }
                });
                    // If entered name is unique, create new player and add to array
                if (playerExists == false){
                    let player_tmp = new Player(personName,playerArray.length+1, sock);
                    UpdatePlayerArray(player_tmp);
                    // Send the full player array list to the new client
                    SendFullPlayerArray(player_tmp);
                    //Initiate the starting function for the new client
                    sock.emit("start");
                }               
            }
                
            if (playerArray.length == 3 ) {
                io.emit('message','gamestrats');
                game = new SHGame(playerArray);

                //set first president candidate
                game._presidentCandidate = playerArray[0];
            }
            // Append to player array
            // use socket reconnect function?
            
        });

    sock.on('message', (text) => {
    //  io.emit sends data to all connected sockets
        io.emit('message', text);
    });

    sock.on('vote', function(data)  {
        // Tell everybody who has voted on which seat (debug)
        // io.emit('message',data.name + " has voted on seat " + data.vote);
        
        // Pass the voting information (the voter and his vote) to the game engine
        if (typeof game != "undefined") {
        game._voting(data.name,data.vote);
        }
    });

    sock.on('emotionUpdate', function(data) {
        io.emit('emotionUpdating', data);
        // Update the lean player array
        leanPlayerArray.forEach(leanPlayer => {
            if (leanPlayer.seatnr == data.seatnr) {
                leanPlayer.emotion = data.emotion;
            }
        });
        
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