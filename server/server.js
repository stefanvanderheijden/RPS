// List all requires modules using const <name> = require('')
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const Player = require('./player')
const RpsGame = require('./rps-game')
const SHGame = require('./SH-game-logic')
// const cardDeck = require('./carddeck');


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

// A variable to store if the game has started
var gameStarted = false;


// Define player array, must be filled in connection function
var playerArray = [];
var leanPlayerArray = [];

function UpdatePlayerArray(player) {
    playerArray.push(player);   
    // create a new lean player object (dictionary)
    leanPlayer = {name : player._name, seatnr : player._seatnr, identity : player._identity, party : player._party, emotion : 0, role : player._role};
    // add this lean player to the leanplayer array
    leanPlayerArray.push(leanPlayer);
    // send this lean player to all the clients (not the full array)
    io.emit('clientArrayUpdate', leanPlayer)
}

function SendFullPlayerArrayToPlayer(player) {
    //send the full array to the new player, so he has all the info
    player._socket.emit("getPlayerArray",leanPlayerArray);

}

function SendFullPlayerArrayToAllPlayers() {
    // clear the lean existing player array
    leanPlayerArray = [];

    // go through all the players in the 'real' player array
    playerArray.forEach((player) => {

        // create a lean player from each player
        leanPlayer = {name : player._name, seatnr : player._seatnr, identity : player._identity, party : player._party, emotion : 0, role : player._role};

        // add this player to the lean player array
        leanPlayerArray.push(leanPlayer);
        
    });

    //send this new lean player array to all the players
    playerArray.forEach((player) => {
        player._socket.emit("getPlayerArray",leanPlayerArray);
    });
    
}

function SendToAllPlayers(message) {
    io.emit('message', message);
}

// If connected you receive an event called connection, with the object sock
io.on('connection', (sock) => {
    sock.on('playername', (personName) => {
            // Send to general chat
            io.emit('message', personName+' has entered the game');
            
            // If player array is empty, i mmediately add new player
            if (playerArray.length == 0){
                // Create tmp player object and add to array
                let player_tmp = new Player(personName,1, sock);
                // Send this new player to all clients
                UpdatePlayerArray(player_tmp);
                // Send the full player array list to the new client
                SendFullPlayerArrayToPlayer(player_tmp);
                // Initiate the starting function for the new client
                sock.emit("start");
                // This is the first player in the array, so this player is the host.
                sock.emit("host");

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
                        SendFullPlayerArrayToPlayer(player);
                        // Initiate the starting function for the new client
                        sock.emit("start");
                        // Check if the game has started already
                        if (gameStarted) {
                            // The game has already been started
                            game._updateSocket(player);
                            game._sendToPlayers(player._getName() + '  has reconnected');
                        }

                    }
                });
                    // If entered name is unique, create new player and add to array
                if (playerExists == false){
                    let player_tmp = new Player(personName,playerArray.length+1, sock);
                    UpdatePlayerArray(player_tmp);
                    // Send the full player array list to the new client
                    SendFullPlayerArrayToPlayer(player_tmp);
                    //Initiate the starting function for the new client
                    sock.emit("start");
                }               
            }
            
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

    sock.on('gameStarts', () => {
        io.emit('message','Game starts');
        game = new SHGame(playerArray, leanPlayerArray);
        //set first president candidate
        game._setPresidentCandidate(playerArray[0]);
        game._startGameRound();
        gameStarted = true;
        SendFullPlayerArrayToAllPlayers();

    })

    sock.on('janein', function(data) {
        if (typeof game != "undefined") {
            game._acceptJaNein(data.name,data.vote);
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

    sock.on('cardSelection',function(data) {
        if (typeof game != "undefined") {
            game._cardSelection(data.name,data.card);
            }
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