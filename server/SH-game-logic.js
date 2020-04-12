// seven player game
class SHGame {
    constructor(players){

        // underscore in de variabele is om aan te geven dat het private variabelen zijn
        this._players = players;

        this._sendToPlayers('Secret hitler starts!');
        
        var rolesIds7p = ['Hitler' , 'Fascist' , 'Fascist', 'Liberal' , 'Liberal' , 'Liberal' , 'Liberal'];
        this._initializeGame(this._players, rolesIds7p)



    }

    _sendToPlayers(msg) {
       this._players.forEach((player) => {
           player._sendToPlayer(msg);
       });

    }

    // This function assigns roles and ids to each player
    _initializeGame(playerarray, roledict){
        // Loop over each player
        playerarray.forEach((player) => {
            var randomNr = Math.floor(Math.random() * roledict.length);
            // Assign a random role to each player from the given dictionary
            player._assignIdentity(roledict[randomNr]);
            // Print role to chat
            player._sendToPlayer('Role: ' + roledict[randomNr])
            player._sendToPlayer('Party: ' + player._getParty())
            
            roledict.splice(randomNr, 1);
        });
        
        // SEND HERE PLAYER IDS OF OTHER FASCISTS TO CORRECT CLIENTS

    }

}


// This file doesn't get called in html so export manually
module.exports = SHGame;