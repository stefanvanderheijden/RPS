
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

        // role can be set to: null, president, presidentCandidate, chancellor, chancellorCandidate
        this._role = null;

        // Has the player voted ja/nein?
        this._hasVoted = false;
        this._mostRecentVote = null;
    }

    _sendToPlayer(msg) {
       this._socket.emit('message', msg);
    }

    _updateLeanPlayerList(leanPlayerArray) {
        this._socket.emit("rolesUpdate", leanPlayerArray);
    }

    _updateVotes(votesArray) {
        this._socket.emit("votesUpdate", votesArray);
    }

    _sendPresidentCards(cardsarray){
        this._socket.emit("drawCards", cardsarray)
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

    _assignRole(role) {
        this._role = role;
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

    _getSeatNr(){
        return this._seatnr;
    }

    _getRole(){
        return this._role;
    }
    
    _updateSocket(socket){
        this._socket = socket;
    }

    _getHasVoted(){
        return this._hasVoted;
    }

    _setHasVoted(bool){
        this._hasVoted = bool;
    }

    _getMostRecentVote(){
        return this._mostRecentVote;
    }
    _setMostRecentVote(bool){
        this._mostRecentVote = bool;
    }

}


// This file doesn't get called in html so export manually
module.exports = Player;