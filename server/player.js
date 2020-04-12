
class Player {
    constructor(name, seatnr,socket){
        // underscore in de variabele is om aan te geven dat het private variabelen zijn
        this._name  = name;
        this._seatnr = seatnr;
        this._socket = socket;

        this._sendToPlayer(name + ' takes seat ' + seatnr);

        // Game related class variables
        this._identity = null;
        this._party = null;
    }

    _sendToPlayer(msg) {
       this._socket.emit('message', msg);
    }

    _assignRoleAndIdentity(identity,party) {
        this._identity = identity;
        this._party = party;
    }

    _updateSocket(socket){
        this._socket = socket;
    }
}


// This file doesn't get called in html so export manually
module.exports = Player;