
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


class CreatePlayer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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

//testing from here
//const bg = new Image()
//const char = new Image()
//const longhair = new Image()
//const shocked = new Image()

var background = new Image();
background.src = "src/IMG/Room.png";

var char = new Image();
char.src = "src/IMG/charbody.png";

var longhair = new Image();
longhair.src = "src/IMG/charhairlong.png";

var shorthair = new Image();
longhair.src = "src/IMG/charhairlong.png";

var shocked = new Image();
shocked.src = "src/IMG/shocked.png";

window.onload = function() {
    BGCanvas.drawImage(background, 0, 0);
    CharCanvas.drawImage(char, P1.x, P1.y);
    GadgetCanvas.drawImage(longhair, 16, 16);
    GadgetCanvas.drawImage(shocked, 16, 16);
}

//testing till here