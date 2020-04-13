
//initialize background canas; draws the background
const HTMLBGCanvas = document.getElementById("bg-canvas")
const BGCanvas = HTMLBGCanvas.getContext("2d")

//initialize the characters canvas; draws all character bodies
const HTMLCharCanvas = document.getElementById("char-canvas")
const CharCanvas = HTMLCharCanvas.getContext("2d")

//initialize the gadget canvas; draws emotions, tokens, cards etc
const HTMLGadgetCanvas = document.getElementById("gadget-canvas")
const GadgetCanvas = HTMLGadgetCanvas.getContext("2d")

//initialize the text canvas, this canvas is used to draw text over the canvas
//note that this canvas has the real resolution (not the pixel-art scaled one)
//Pixel art is still rendered by utilizing pixel-art typefonts.
const HTMLTextCanvas = document.getElementById("text-canvas")
const TextCanvas = HTMLTextCanvas.getContext("2d")

var VT323 = new FontFace("VT323", "https://fonts.googleapis.com/css2?family=VT323&display=swap");
TextCanvas.font = "30px VT323";
TextCanvas.textAlign = "center";

class Createseat {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.name = " ";
    }
}


//load background
var background = new Image();
background.src = "src/IMG/Room.png";

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
    GadgetCanvas.clearRect(seat.x+6, seat.y+6, 20, 14);
    GadgetCanvas.drawImage(emotion, seat.x, seat.y)
}

window.onload = function() {
    Seats.forEach(seat => {


    //TextCanvas.fillText(seat.name, 4*(seat.x+15), 4*(seat.y+36));
    });

    BGCanvas.drawImage(background, 0, 0);
   
}
