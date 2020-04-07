
//initialize background canas; draws the background
const HTMLBGCanvas = document.getElementById("bg-canvas")
const BGCanvas = HTMLBGCanvas.getContext("2d")

//initialize the characters canvas; draws all character bodies
const HTMLCharCanvas = document.getElementById("char-canvas")
const CharCanvas = HTMLCharCanvas.getContext("2d")

//initialize the gadget canvas; draws hair, emotions, tokens, cards etc
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

class CreatePlayer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.name = "Name";
    }
}

function loadImage(url) {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
  }

P1 = new CreatePlayer(16,16);
P2 = new CreatePlayer(56,16);
P3 = new CreatePlayer(96,16);
P4 = new CreatePlayer(136,16);
P5 = new CreatePlayer(136,64);
P6 = new CreatePlayer(136,112);
P7 = new CreatePlayer(96,112);
P8 = new CreatePlayer(56,112);
P9 = new CreatePlayer(16,112);
P10 = new CreatePlayer(16,64);

const Players = [P1,P2,P3,P4,P5,P6,P7,P8,P9,P10];

//load background
var background = new Image();
background.src = "src/IMG/Room.png";

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

window.onload = function() {

    Players.forEach(player => {
    console.log("hallo");
    CharCanvas.drawImage(char, player.x, player.y)
    GadgetCanvas.drawImage(shorthair, player.x, player.y)
    GadgetCanvas.drawImage(excited, player.x, player.y)
    TextCanvas.fillText(player.name, 4*(player.x+15), 4*(player.y+36));
    });

    BGCanvas.drawImage(background, 0, 0);
   
}
