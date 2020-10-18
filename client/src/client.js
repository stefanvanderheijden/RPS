
// Ik kreeg foutmeldingen totdat ik onderstaande regel commenteerde???
//import { Socket } from "dgram";

// const { strict } = require("assert");

var person = ''
var ownPlayer;
var cardSelector = 0;
var cardsInDeck = [];
var fasLawsCount = 0;
var libLawsCount = 0;

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

sock.on('startingTheGame', function() {
    drawField(localplayerArray.length); 
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
    localplayerArray = leanPlayerArray;
    localplayerArray.forEach((player) => {
        drawRole(player.seatnr,player.role);
        // check the name of every player in the player array, if that name is this person, assign the object here
        if (player.name == person) {
            ownPlayer = player;
        }
    });
    if (ownPlayer.role == "president") {
        writeEvent("You are the president.")
    }
    if (ownPlayer.role == "chancellor") {
        writeEvent("You are the chancellor.")
    }
});

// This function reveives an array of votes, with [seat,vote]
// This function draws all the votes of the players for three seconds.
// The votes are displayed by a graphical hand with a red or green card.
sock.on("votesUpdate", function(votesArray) {
    // Draw the votes
    votesArray.forEach((vote) => {
        drawVote(vote[0], vote[1]);
    });
    // clear the votes after 3 seconds
    setTimeout(clearVote, 3000);
});



// This function receives a type of law ('fascist' or 'liberal') and draws it on the board of the player.
// Where the card is drawn is determined by the amount of laws that are already present.
// The player keeps track of this counter locally.
sock.on("newLaw", function(type) {
    if (type == 'fascist') {
        // draw a new fascist law
        fasLawsCount ++;
        drawLaw(type, (fasLawsCount - 1 ));
    } else if (type == 'liberal') {
        // draw a new liberal law
        libLawsCount ++;
        drawLaw(type, (libLawsCount - 1 ));
    }
});

sock.on("drawCards", function(cardsArray) {
    cardsInDeck = cardsArray;
    drawCards(cardsArray);
    if (ownPlayer.role == "president") {
        writeEvent("Pick one card to discard. Then click pass cards.")
    }
    if (ownPlayer.role == "chancellor") {
        writeEvent("Select one card to pass as law!")
    }
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
            return;
        }
        
    }

    if (cardsInDeck.length > 0) {
        // check if the player even has a player assigned to him
        if (ownPlayer) {
            if (ownPlayer.role == "president") { 
                writeEvent("You discarded a " + cardsInDeck[cardSelector-1] + " card.")
                cardsInDeck.splice(cardSelector-1,1);
                sock.emit("cardsFromPresident",cardsInDeck);
                writeEvent("You just gave a " + cardsInDeck[0] + " and a " + cardsInDeck[1] + " card to your chancellor.")
                cardsInDeck = [];
                drawCards(cardsInDeck);
                //TODO Send the cards minus the selected card!
            }
            if (ownPlayer.role == "chancellor") { 
                //TODO Send the selected card!
            }
        }
    }

    // Actions when clicked on the button below the cards
    });

function cardPress(cardNr) {
    // Check if the cards deck is not empty:
    if (cardsInDeck.length > 0) {
        if (ownPlayer.role == "president") {
                console.log("card selected: " + cardNr);
                var msg = ""
                
                switch(cardNr) {
                    case 1:
                        msg = "You have selected the first card to be discarded. The other two cards will be send to your chancellor once you click the button."
                        break;
                    case 2:
                        msg = "You have selected the second card to be discarded. The other two cards will be send to your chancellor once you click the button."
                        break;
                    case 3:
                        msg = "You have selected the third card to be discarded. The other two cards will be send to your chancellor once you click the button."
                        break;
                }
                drawSelectionBorder(cardNr,cardsInDeck);
                drawButton('Pass cards');
                writeEvent(msg)
                cardSelector = cardNr;
                // TODO Draw a visual clue on the card that this has been selected
            }
        if (ownPlayer.role == "chancellor") {
                // The 3rd card can not be visible, as the chancellor only gets two cards to choose from
                if (cardNr != 3) {
                    var msg = ""
                    switch(cardNr) {
                        case 1:
                            msg = "You have selected the first card to be enacted. Click the button to enact the law."
                            break;
                        case 2:
                            msg = "You have selected the second card to be enacted. Click the button to enact the law."
                            break;
                    }
                    drawSelectionBorder(cardNr,cardsInDeck);
                    drawButton('Enact law');
                    writeEvent(msg)
                    cardSelector = cardNr;
                    // TODO Draw a visual clue on the card that this has been selected
                }
        }
    }
}

$("#card1").on("click", function(e) {
    // Prevent the default link to be opened for the area in the HTML
    e.preventDefault();
    cardPress(1);
    });

$("#card2").on("click", function(e) {
    // Prevent the default link to be opened for the area in the HTML
    e.preventDefault();
    cardPress(2);
    });

$("#card3").on("click", function(e) {
    // Prevent the default link to be opened for the area in the HTML
    e.preventDefault();
    cardPress(3);
    });

$(document).ready(function() {
    $(function() {
        var pos = { my: "center center", at: "center top+350", of: window };
        
        // TEST FEATURE: DELETE BEFORE LAUNCH
        $("#t1").val(Math.round(Math.random(1)*100000));
        // END TEST FEATURE

        $( "#my_dialog" ).dialog({
            modal: true,
            autoOpen: true,
            position:pos,
            buttons: {
                 "+  Join game  +": function(){
                    person = $("#t1").val();
                    sock.emit('playername',person);
                    $( this ).dialog( "close" );
                 }
               }
        });

        // TEST FEATURE: DELETE BEFORE LAUNCH
        person = $("#t1").val();
        sock.emit('playername',person);
        $( "#my_dialog").dialog( "close" );
        // END TEST FEATURE

    });
});

$('#my_dialog').keypress(function(e) {
    if (e.keyCode == $.ui.keyCode.ENTER) {
        person = $("#t1").val();
        //var person = "jaapie"
        sock.emit('playername',person)
        $( this ).dialog( "close" );
        e.preventDefault();
    }
});
