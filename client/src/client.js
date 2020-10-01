
// Ik kreeg foutmeldingen totdat ik onderstaande regel commenteerde???
//import { Socket } from "dgram";

var person = ''

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

function sendJaNein(jaodernein){
    // emit the ja or nein vote to the server with client name
    sock.emit('janein', {name: person, vote: jaodernein});
};

function startingSequence() {
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
    });
}

// Create local playerArray to use in graphics
var localplayerArray = [];

// A variable to see if the start function has been executed (not to be confused with the gameStarted)
var started = false;

// A variable to see if the player is the host
var host = false;

// A variable to store if the game has started
var gameStarted = false;

// When refreshing the page, a prompt appears to enter the player name
// TODO: capital letters/spelling mistakes/etc and max name length
// TODO: make separate function that automatically sends to server



// Send playername to server


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
    console.log("received updated player array")
});

// These things are done when the socket is initialized.
sock.on("start", function(){
    // Wait for a second before drawing stuff, to give the images a chance to load
    setTimeout(startingSequence, 1000);
    started = true;

    });


sock.on("host", function(){
    // This function sets the player up to be the host of the game
    // The host is able to:
    // - Start the game (TODO)
    // - Reset the server (TODO)

    // Set the host variable to true
    host = true;

    writeEvent("You are the host of this game.")

    drawButton("Start Game!")

    // Draw the Start button on the card canvas
    // Set the button to start the game
});    

sock.on('emotionUpdating', function(data) {
    drawEmotion(data.emotion, data.seatnr);
});

sock.on("rolesUpdate", function(leanPlayerArray) {
    leanPlayerArray.forEach((player) => {
        drawRole(player.seatnr,player.role);
    });
});

sock.on("votesUpdate", function(votesArray) {
    // Draw the votes
    votesArray.forEach((vote) => {
        drawVote(vote[0], vote[1]);
    });
    // clear the votes after 3 seconds
    setTimeout(clearVote, 3000);
    
});

sock.on("drawCards", function(cardsArray) {
    drawCards(cardsArray);
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
    writeEvent("You clicked on yes");
    sendJaNein(1);
    });

$("#nobutton").on("click", function(e) {
    // Prevent the default link to be opened for the area in the HTML
    e.preventDefault();
    // Actions when clicked on the NEIN BUTTON
    writeEvent("You clicked on nein");
    sendJaNein(0);
    });

$("#cardsbutton").on("click", function(e) {
    // Prevent the default link to be opened for the area in the HTML
    e.preventDefault();
    
    // check if this clien is the host
    if (host) {
        //check if the game has not yet started
        if (!gameStarted) {
            sock.emit('gameStarts');
            gameStarted = true;
            drawButton(' ');
        }
    }

    // Actions when clicked on the button below the cards
    });

$("#card1").on("click", function(e) {
    // Prevent the default link to be opened for the area in the HTML
    e.preventDefault();
    // Actions when clicked on the FIRST CARD
    msg = {name: person, card: 1};
    sock.emit('cardSelection',msg);
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

$(document).ready(function() {
    $(function() {
        var pos = { my: "center center", at: "center top+350", of: window };
        $( "#my_dialog" ).dialog({
            modal: true,
            autoOpen: true,
            position:pos,
            buttons: {
                 "+  Join game  +": function(){
                    person = $("#t1").val();
                    //var person = "jaapie"
                    sock.emit('playername',person)
                    $( this ).dialog( "close" );
                 }
               }
    });
    });
    })

$('#my_dialog').keypress(function(e) {
    if (e.keyCode == $.ui.keyCode.ENTER) {
        person = $("#t1").val();
        //var person = "jaapie"
        sock.emit('playername',person)
        $( this ).dialog( "close" );
        e.preventDefault();
    }
});
