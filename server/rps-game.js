
class RpsGame {
    constructor(p1, p2){
        // underscore in de variabele is om aan te geven dat het private variabelen zijn
        this._players = [p1 , p2];
        this._turns = [null, null];

        this._sendToPlayers('Rock Paper Scissors Starts!');

        this._players.forEach((player, idx) => {
            player.on('turn', (turn) => {
                this._onTurn(idx, turn)
            })
        });

    }

    _sendToPlayers(msg) {
       this._players.forEach((player) => {
           player.emit('message', msg);
       });
    }

    _sendToPlayer(playerIndex, msg) {
        this._players[playerIndex].emit('message', msg);
    }

    _onTurn(playerIndex, turn) {
        //if (this._turns[playerIndex] = null) {
        //    this._turns[playerIndex] = turn;
            this._sendToPlayer(playerIndex, `You have selected ${turn}`);
        //} else {
        //    this._sendToPlayer(playerIndex, `You have already selected a throw!`);
        //}       

    }


}

module.exports = RpsGame;