
class Player {
    constructor(name, seatnr){
        // underscore in de variabele is om aan te geven dat het private variabelen zijn
        this._name  = name;
        this._seatnr = seatnr;

        this._socketid = null;

        this._sendToPlayers(name + 'entered/reentered the game at seat' + seatnr);

        // Game related class variables
        this._identity = null;
        this._party = null;

    }

    _sendToPlayers(msg) {
       this._players.forEach((player) => {
           player.emit('message', msg);
       });

    }

    _assignRoleAndIdentity(identity,party) {
        this._identity = identity;
        this._party = party;
    }

    _updateSocketID(socketid){
        this.socketid = socketid;
    }



}


// This file doesn't get called in html so export manually
module.exports = Player;