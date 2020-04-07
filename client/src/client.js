const writeEvent = (text) => {
    // <ul> element, defined in index.html. ul = unordered list
    const parent = document.querySelector('#events');

    // <li> element, defined in index.html. li  => represents list item
    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);

    parent.scrollTop = parent.scrollHeight;

};

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