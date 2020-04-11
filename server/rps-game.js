
class RpsGame {
    constructor(p1, p2){
        // underscore in de variabele is om aan te geven dat het private variabelen zijn
        this._players = [p1 , p2];
        this._turns = [null, null];
        this._score = [0,0];

        this._sendToPlayers('Rock Paper Scissors Starts!');
        this._sendToPlayer(0,"You are Player One!");
        this._sendToPlayer(1,"You are Player Two!");


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

    _updatescores() {
        const msg = `Scores: Player One: ${this._score[0]} Player Two: ${this._score[1]}`
        this._players.forEach((player) => {
            player.emit('score', msg);
        });
    }


    _sendToPlayer(playerIndex, msg) {
        this._players[playerIndex].emit('message', msg);

    }

    _onTurn(playerIndex, turn) {
        if (this._turns[playerIndex] == null) {
                
                this._sendToPlayer(playerIndex, `You have selected ${turn}`);
                this._turns[playerIndex] = turn;
            } else {
                this._sendToPlayer(playerIndex, `You have already selected a throw!`);
            }       
            this._checkGameOver();
    }

    _checkGameOver() {
        const turns = this._turns;

        if (turns[0] && turns[1]) {
            //this._sendToPlayers('Game Over ' + turns.join(' : '))
            this._checkGameResults();
            this._updatescores();
            this._turns = [null, null];
            
            //this._sendToPlayers("Next round!!!!")
        }
    }

    _checkGameResults() {

        const p0 = this._decodeTurn(this._turns[0]);
        const p1 = this._decodeTurn(this._turns[1]);

        const distance = (p1 - p0 + 3) % 3;

        switch (distance) {
            case 0:
            //draw
                this._sendToPlayers("Draw!");
                break;
            case 1:
            //first player won
                this._sendWinMessage(this._players[0],this._players[1]);
                this._score[0] ++;
                break;
            case 2:
            //seconde won
                this._sendWinMessage(this._players[1],this._players[0]);
                this._score[1] ++;
                break;
        }

    }

    _sendWinMessage(winner, loser) {
        winner.emit('message', 'You won!');
        loser.emit('message', 'You lost!');
    }

    _decodeTurn(turn) {
        switch (turn) {
            case 'rock':
                return 0
            case 'scissors':
                return 1
            case 'paper':
                return 2
            default:
                throw new Error('Could not decode turn' + turn)
        }
    }

}


// This file doesn't get called in html so export manually
module.exports = RpsGame;