const writeEvent = (text) => {
    // <ul> element, defined in index.html. ul = unordered list
    const parent = document.querySelector('#events');
    // <li> element, defined in index.html. li  => represents list item
    const el = document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el);
    parent.scrollTop = parent.scrollHeight;

};

const addButtonListeners = () => {
    ['rock','paper','scissors'].forEach((id) => {
        const button = document.getElementById(id);
        button.addEventListener('click', () => {
            sock.emit('turn', id)
        });
    });
};

const onFormSubmitted = (e) => {
    e.preventDefault();
    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';
    sock.emit('message', text);
    console.log('verzonden bericht');
};

// Create socket 
const sock = io();

// Create local playerArray to use in graphics
var localplayerArray = [];

// A variable to see if the start function has been executed
var started = false;

// When refreshing the page, a prompt appears to enter the player name
// TODO: capital letters/spelling mistakes/etc and max name length
// TODO: make separate function that automatically sends to server
var person = prompt("Please enter your name:", "kksukkel");

// Send playername to server
sock.emit('playername',person)

// Subscribe to message topic
sock.on('message', writeEvent);

sock.on('clientArrayUpdate', function(player) {
    //Arrays should only be updated for players who have already started earlier
    //Because new players get the full array anyway
    if (started) {
    
    console.log('received the updated Array')
    // add the player to the local player list
    localplayerArray.push(player);
    // draw the name of the newly added player on the canvas
    drawName(player.name,player.seatnr);
    // call the draw function in game_graphics.js to draw all the names in player array
    };

})

sock.on('getPlayerArray', function(playerarray) {
    localplayerArray = playerarray;
    console.log("received new player array")
});

// These things are done when the socket is initialized.
sock.on("start", function(){
    //when the socket is first started, it should draw ALL names of the players
    localplayerArray.forEach((player) => {
    drawName(player.name,player.seatnr);
    console.log("drawing player "+ player.name);
    started = true;
    });
    });


document
    .querySelector('#chat-form')
    .addEventListener('submit', onFormSubmitted);

addButtonListeners();