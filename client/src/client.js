const writeEvent = (text) => {
    // <ul> element
    const parent = document.querySelector('#events');

    // <li> element
    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);

    parent.scrollTop = parent.scrollHeight;

};

//initialize canvas
const canvas = document.getElementById("my-canvas")
const context = canvas.getContext("2d")

//testing from here
const bg = new Image()
const char = new Image()
const longhair = new Image()
const shocked = new Image()
bg.src = "src/Room.png"
char.src = "src/charbody.png"
longhair.src = "src/charhairlong.png"
shocked.src = "src/shocked.png"
bg.onload = () => {
  context.drawImage(bg, 0, 0)
  context.drawImage(char, 16, 16)
  context.drawImage(longhair, 16, 16)
  context.drawImage(shocked, 16, 16)
}

//testing till here



const scoring = (scoretext) => {
    document.getElementById('score').innerHTML = scoretext
}

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
    console.log('verzonden bericht')
};

writeEvent('Welcome to chat verzonden vanuit de client js');

const sock = io();
sock.on('message', writeEvent);

sock.on('score', (scores) => {
    scoring(scores);
})

document
    .querySelector('#chat-form')
    .addEventListener('submit', onFormSubmitted);

addButtonListeners();