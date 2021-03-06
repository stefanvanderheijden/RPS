
//initialize background canas; draws the background and the character color back.
const HTMLBGCanvas = document.getElementById("bg-canvas")
const BGCanvas = HTMLBGCanvas.getContext("2d")

//initialize the characters canvas; draws all character bodies
const HTMLCharCanvas = document.getElementById("char-canvas")
const CharCanvas = HTMLCharCanvas.getContext("2d")

//initialize the gadget canvas; draws emotions, tokens
const HTMLGadgetCanvas = document.getElementById("gadget-canvas")
const GadgetCanvas = HTMLGadgetCanvas.getContext("2d")

//initialize the text canvas, this canvas is used to draw text over the canvas
//note that this canvas has the real resolution (not the pixel-art scaled one)
//Pixel art is still rendered by utilizing pixel-art typefonts.
const HTMLTextCanvas = document.getElementById("text-canvas")
const TextCanvas = HTMLTextCanvas.getContext("2d")

//initialize the text canvas used on the cards window
const HTMLCTextCanvas = document.getElementById("cards-text-canvas")
const CTextCanvas = HTMLCTextCanvas.getContext("2d")

//initialize the gadget canvas on the card window
const HTMLCGadgetCanvas = document.getElementById("cards-gadget-canvas")
const CGadgetCanvas = HTMLCGadgetCanvas.getContext("2d")

var LibLaw = new Image();
LibLaw.src = "src/IMG/LibLaw.png";

var FasLaw = new Image();
FasLaw.src = "src/IMG/FasLaw.png";

TextCanvas.font = "0.6rem 'Press Start 2P'";
TextCanvas.textAlign = "center";
TextCanvas.fillStyle = "white";

CTextCanvas.font = "0.6rem 'Press Start 2P'";
CTextCanvas.textAlign = "center";

class Createseat {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.name = " ";
    }
}

class law {
    constructor(x,y,type){
        this.x = x*4;
        this.y = y*4;
        this.type = type;
        this.visible = false;
    }

    draw() {
        if (this.type == 'fascist') {
            GadgetCanvas.drawImage(FasLaw,this.x,this.y);
        } else {
            GadgetCanvas.drawImage(LibLaw,this.x,this.y); 
        }
    }
}

var LibLaws = [
    new law(63,64,'liberal'),
    new law(75,64,'liberal'),
    new law(87,64,'liberal'),
    new law(99,64,'liberal'),
    new law(111,64,'liberal')
]

var FasLaws = [
    new law(57,90,'fascist'),
    new law(69,90,'fascist'),
    new law(81,90,'fascist'),
    new law(93,90,'fascist'),
    new law(105,90,'fascist'),
    new law(117,90,'fascist')
]

//load background
var background = new Image();
background.src = "src/IMG/Room.png";

//load background
var field56 = new Image();
field56.src = "src/IMG/Room_5_6.png";

//load background
var field78 = new Image();
field78.src = "src/IMG/Room_7_8.png";

//load background
var field910 = new Image();
field910.src = "src/IMG/Room_9_10.png";

//load border
var border = new Image();
border.src = "src/IMG/yourseat.png";

//load basic character
var char = new Image();
char.src = "src/IMG/charbody.png";

//load long hair image
var longhair = new Image();
longhair.src = "src/IMG/charhairlong.png";

//load short hair image
var shorthair = new Image();
shorthair.src = "src/IMG/charhairshort.png";

//load shocked emotion
var shocked = new Image();
shocked.src = "src/IMG/shocked.png";

//load excited emotion
var excited = new Image();
excited.src = "src/IMG/excited.png";

//load all emotions
var emo0 = new Image();
emo0.src = "src/IMG/emo/0.png";
var emo1 = new Image();
emo1.src = "src/IMG/emo/1.png";
var emo2 = new Image();
emo2.src = "src/IMG/emo/2.png";
var emo3 = new Image();
emo3.src = "src/IMG/emo/3.png";
var emo4 = new Image();
emo4.src = "src/IMG/emo/4.png";
var emo5 = new Image();
emo5.src = "src/IMG/emo/5.png";
var emo6 = new Image();
emo6.src = "src/IMG/emo/6.png";
var emo7 = new Image();
emo7.src = "src/IMG/emo/7.png";
var emo8 = new Image();
emo8.src = "src/IMG/emo/8.png";

//load all tokens
var presidentIMG = new Image();
presidentIMG.src = "src/IMG/Presi.png";

var presidentCandidateIMG = new Image();
presidentCandidateIMG.src = "src/IMG/PresiCandi.png";

var chancellorIMG = new Image();
chancellorIMG.src = "src/IMG/Chan.png";

var chancellorCandidateIMG = new Image();
chancellorCandidateIMG.src = "src/IMG/ChanCandi.png";

//load yes and no images
var YesVote = new Image();
YesVote.src = "src/IMG/HandYes.png"

var NoVote = new Image();
NoVote.src = "src/IMG/HandNo.png"

//load backgrounds for fascist and hitler
var FascistBG = new Image();
FascistBG.src = "src/IMG/FascistBG.png"

var HitlerBG = new Image();
HitlerBG.src = "src/IMG/HitlerBG.png"

//Load NOT HITLER token
var CNHIMG = new Image();
CNHIMG.src = "src/IMG/CNH.png";

//Load the two types of cards (the large versions in the bottom right)
var fasCard = new Image();
fasCard.src = "src/IMG/FasCard.png";

var libCard = new Image();
libCard.src = "src/IMG/LibCard.png";

//create an array of the emotion image objects
const emotions = [emo0, emo1, emo2, emo3, emo4, emo5, emo6, emo7, emo8]

//Creating all the seats
S1 = new Createseat(16,16);
S2 = new Createseat(56,16);
S3 = new Createseat(96,16);
S4 = new Createseat(136,16);
S5 = new Createseat(136,64);
S6 = new Createseat(136,112);
S7 = new Createseat(96,112);
S8 = new Createseat(56,112);
S9 = new Createseat(16,112);
S10 = new Createseat(16,64);

const Seats = [S1,S2,S3,S4,S5,S6,S7,S8,S9,S10];

//Creating all the card locations
C1 = new Createseat(50,15);
C2 = new Createseat(76,15);
C3 = new Createseat(102,15);

const CardLocations = [C1,C2,C3];

function drawName(name,seatnumber) {
    seat = Seats[seatnumber-1];
    TextCanvas.fillText(name, 4*(seat.x+15), 4*(seat.y+36));
    CharCanvas.drawImage(char, seat.x, seat.y)
    CharCanvas.drawImage(shorthair, seat.x, seat.y)
    //GadgetCanvas.drawImage(excited, seat.x, seat.y)
    }

function drawBorder(seatnumber) {
    seat = Seats[seatnumber-1];
        GadgetCanvas.drawImage(border, seat.x-4, seat.y-2);
}

function drawEmotion(emotionindex, seatnumber) {
    seat = Seats[seatnumber-1];
    //console.log(emotionindex);
    emotion = emotions[emotionindex]
    GadgetCanvas.clearRect(seat.x+8, seat.y+6, 20, 14);
    GadgetCanvas.drawImage(emotion, seat.x, seat.y)
}

// Draws the drawn cards into the three rectangles for law enactment
function drawCards(cards) {
    //clear a rectangle on the canvas
    CGadgetCanvas.clearRect(47,12,75,29);
    //draw the cards that have been passed.
    cardNo = 0;

    cards.forEach((card) => {
        cardLocation = CardLocations[cardNo];
        if (card == "fascist") {
            //draw a fascist card
            CGadgetCanvas.drawImage(fasCard,cardLocation.x,cardLocation.y);

        } else if (card == "liberal") {
            //draw a liberal card
            CGadgetCanvas.drawImage(libCard,cardLocation.x,cardLocation.y);
        }
        cardNo ++;
    });
}
function drawSelectionBorder(card,cards,message) {
    //clear a rectangle on the canvas
    CGadgetCanvas.clearRect(47,12,75,29);
    //draw the cards that have been passed.
    cardNo = 0;

    cards.forEach((card) => {
        cardLocation = CardLocations[cardNo];
        if (card == "fascist") {
            //draw a fascist card
            CGadgetCanvas.drawImage(fasCard,cardLocation.x,cardLocation.y);

        } else if (card == "liberal") {
            //draw a liberal card
            CGadgetCanvas.drawImage(libCard,cardLocation.x,cardLocation.y);
        }
        cardNo ++;
    });

    SCard = CardLocations[card-1];
    CGadgetCanvas.beginPath();
    CGadgetCanvas.rect(SCard.x-2,SCard.y-2,20,26);
    CGadgetCanvas.stroke();
}

function drawButton(text) {
    // in the CTextCanvas all the coordinates have to be multiplied by 4
    CTextCanvas.clearRect(66*4,42*4,36*4,12*4);
    CTextCanvas.fillText(text, 85*4, 50*4);
}

function clearCards() {
    CGadgetCanvas.clearRect(47,7,78,37);
}

function setBackground() {
    //this function sets the background behind hitler and fascists. 
    //it is only used by members of the fascist party.
}

// This function draws the vote on a specific seatnumber
function drawVote(seatnumber,vote) {
    seat = Seats[seatnumber-1];

    //clear the space where the vote is displayed
    GadgetCanvas.clearRect(seat.x+2,seat.y+9,8,21)
    switch(vote) {
        case 1: 
            console.log('drawing Yes vote')
            GadgetCanvas.drawImage(YesVote,seat.x,seat.y);
            break;
        case 0: 
            console.log('drawing No vote')
            GadgetCanvas.drawImage(NoVote,seat.x,seat.y);
            break;
                }
}

// This function clears all the visual votes from the board
function clearVote() {
    Seats.forEach((seat) => {
        GadgetCanvas.clearRect(seat.x+2,seat.y+9,8,21)
    });
}

function drawRole(seatnumber, role) {
    //this function takes in a seatnr and a rol, clears the token on that seatnumber and draw the token for the role.
    
    //retrieve the seat-object that belongs to the seat (so to get the X and Y coordinates of the seat)
    seat = Seats[seatnumber-1];

    //clear the image that is currently on the token area
    GadgetCanvas.clearRect(seat.x+19,seat.y+19,13,13)

    //draw a new token in case of a role
    switch(role) {
        case "president":
            {
            GadgetCanvas.drawImage(presidentIMG, seat.x+20, seat.y+20);
            console.log("drawing president token");
            break;
            }
        case "presidentCandidate":
            {
            GadgetCanvas.drawImage(presidentCandidateIMG, seat.x+20, seat.y+20);
            console.log("drawing president candidate token");
            break;               
            }
        case "chancellor":
            {
            GadgetCanvas.drawImage(chancellorIMG, seat.x+20, seat.y+20);
            console.log("drawing chancellor token");
            break;
            }
        case "chancellorCandidate":
            {
            GadgetCanvas.drawImage(chancellorCandidateIMG, seat.x+20, seat.y+20);
            console.log("drawing chancellor candidate token");
            break;    
            }
        case null:
            {
            break;  
            }
    }
}

function drawCNH(seatnumber) {
    seat = Seats[seatnumber-1];
    GadgetCanvas.drawImage(CNHIMG, seat.x+2, seat.y+21);
}

function drawField(numberOfPlayers) {
    if (numberOfPlayers == 5 || numberOfPlayers == 6) {
        BGCanvas.drawImage(field56, 0, 0);
    }
    if (numberOfPlayers == 7 || numberOfPlayers == 8) {
        BGCanvas.drawImage(field78, 0, 0);
    }
    if (numberOfPlayers == 9 || numberOfPlayers == 10) {
        BGCanvas.drawImage(field910, 0, 0);
    }
}

function drawLaw(type,index) {
    if (type == 'liberal') {
        LibLaws[index].draw();
    } else if (type == 'fascist') {
        FasLaws[index].draw();
    }
}

window.onload = function() {
    //Draw the background image
    BGCanvas.drawImage(background, 0, 0);
    // Drawing the words on the YES and NO button on the cards area (bottom right)
    CTextCanvas.fillText("JAWOHL", 96, 96);
    CTextCanvas.fillText("NEIN", 96, 174);
}
