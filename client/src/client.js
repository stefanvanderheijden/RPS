
// Ik kreeg foutmeldingen totdat ik onderstaande regel commenteerde???
//import { Socket } from "dgram";

const writeEvent = (text) => {
    // <ul> element, defined in index.html. ul = unordered list
    const parent = document.querySelector('#events');
    // <li> element, defined in index.html. li  => represents list item
    const el = document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el);
    parent.scrollTop = parent.scrollHeight;

};

// Create socket 
const sock = io();

var myseatnr = 0;

function emotionSubmit(emotionindex) {
    sock.emit('emotionUpdate', {emotion : emotionindex, seatnr : myseatnr});
};


const onFormSubmitted = (e) => {
    e.preventDefault();
    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';
    sock.emit('message', person + ": " + text);
    console.log('verzonden bericht');
};

function sendVote(areanumber) {
    // emit to the server on which the client has clicked. Also send the client name
    sock.emit("vote", {name: person, vote: areanumber});
};


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
    drawEmotion(player.emotion, player.seatnr);
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
        drawEmotion(player.emotion, player.seatnr);

        // For the clients own name, also draw a border.
        if (player.name == person) {
            myseatnr = player.seatnr;
            drawBorder(player.seatnr);
            console.log("drawing border")
        }

        //TESTING
        //drawRole(1,"president");
        drawRole(2,"president");
        //drawRole(3,"chancellor");
        drawRole(4,"chancellor");
        drawCNH(2);
        //END TESTING
        started = true;
    });
    });

sock.on('emotionUpdating', function(data) {
    drawEmotion(data.emotion, data.seatnr);
});
    

document
    .querySelector('#chat-form')
    .addEventListener('submit', onFormSubmitted);

const areas = ["#p1area","#p2area","#p3area","#p4area","#p5area","#p6area","#p7area","#p8area","#p9area","#p10area"]

areas.forEach((area) => {
    
    $(area).on("click", function(e){
        // Prevent the default link to be opened for the area in the HTML
        e.preventDefault();
        // Get the areanumber by index of the array
        areanumber = areas.indexOf(area)+1;
        // Write to the console which you have clicked
        writeEvent("You clicked on seat " + areanumber);
        // call the function that sends the vote to the server
        sendVote(areanumber);
    });
    });

$("#yesbutton").on("click", function(e) {
    // Prevent the default link to be opened for the area in the HTML
    e.preventDefault();
    // Actions when clicked on the JAWOHL BUTTON
    });

$("#nobutton").on("click", function(e) {
        // Prevent the default link to be opened for the area in the HTML
        e.preventDefault();
        // Actions when clicked on the NEIN BUTTON
        });

$("#cardsbutton").on("click", function(e) {
    // Prevent the default link to be opened for the area in the HTML
    e.preventDefault();
    // Actions when clicked on the button below the cards
    });

$("#card1").on("click", function(e) {
    // Prevent the default link to be opened for the area in the HTML
    e.preventDefault();
    // Actions when clicked on the FIRST CARD
    });

$("#card2").on("click", function(e) {
    // Prevent the default link to be opened for the area in the HTML
    e.preventDefault();
    // Actions when clicked on the SECOND CARD
    });

$("#card3").on("click", function(e) {
    // Prevent the default link to be opened for the area in the HTML
    e.preventDefault();
    // Actions when clicked on the THIRD CARD
    });