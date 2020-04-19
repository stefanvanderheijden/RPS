
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
        this._role = null;
    }

    _sendToPlayer(msg) {
       this._socket.emit('message', msg);
    }

    _assignIdentity(identity) {
        this._identity = identity;
        // Base the party on the given ID
        if (identity == 'Hitler' || identity == 'Fascist'){
            this._party = 'Fascist';      
        } else {
            this._party = 'Liberal';
        }
    }

    _getName(){
        return this._name;
    }

    _getParty(){
        return this._party;
    }

    _getIdentity(){
        return this._identity;
    }

    _updateSocket(socket){
        this._socket = socket;
    }
}


// This file doesn't get called in html so export manually
module.exports = Player;