
class Player {
    constructor(name, seatnr){
        // underscore in de variabele is om aan te geven dat het private variabelen zijn
        this._name  = name;
        this._seatnr = seatnr;

        this._socket = null;

        // this._sendToPlayer(name + 'entered/reentered the game at seat' + seatnr);

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