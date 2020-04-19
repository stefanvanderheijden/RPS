// seven player game

class SHGame {
    constructor(players){
        // underscore in de variabele is om aan te geven dat het private variabelen zijn
        this._players = players;
        this.hasBegun = true;

        this._sendToPlayers('Secret hitler starts!');
        
        // Dependent on number of players
        this._numberOfPlayers = 7;
        var rolesIds7p = ['Hitler' , 'Fascist' , 'Fascist', 'Liberal' , 'Liberal' , 'Liberal' , 'Liberal'];

        // Initialize game
        this._initializeGame(this._players, rolesIds7p)

        // The variables are filled with the player objects
        this._presidentCandidate = null;
        this._chancellorCandidate = null;
        this._president = null;
        this._chancellor = null;

        // Game states - make separate class
        this._lookingForChancellor = true;
        this._janein = false;

    }

    // a function that retrieves the players name by inputting the seatnr
    _getPlayerBySeatNr(seatNr) {
        var playertmp;  
        this._players.forEach((player) => {
        
            // Check which player name coincides with player
            if (player._getSeatNr() == seatNr) {
                playertmp=player;
            }
        });
        return playertmp;
    }

    // a function that retrieves the players name by inputting the seatnr
    _getPlayerByName(name) {
        var playertmp;  
        this._players.forEach((player) => {

            // Check which player name coincides with player
            if (player._getName() == name) {
                playertmp=player;
            }
        });
        return playertmp;
    }

    _voting(voter_name,vote_seatnr) {
        // this function received the name of the person who has voted 
        // and the seat number on which that person has voted.
        this._sendToPlayers("test");
        // Are we looking for chancellor?
        if (this._lookingForChancellor == true) {   
            // Is the voter the president candidate?
            if (voter_name == this._presidentCandidate._getName()) {
                

                // Get voter player object
                var voter = this._getPlayerByName(voter_name);
                this._sendToPlayers(voter._getName());
                // Get votee player object
                var votee = this._getPlayerBySeatNr(vote_seatnr);

                if ((voter != votee) && (vote_seatnr <= this._numberOfPlayers)){
                    this._chancellorCandidate = votee;
                    this._sendToPlayers("The new candidate for chancellor is " + votee._getName());
                } else {
                    voter._sendToPlayer('You did not enter a correct vote');
                }
            }
        }
    }

    _sendToPlayers(msg) {
       this._players.forEach((player) => {
           player._sendToPlayer(msg);
       });
    }

    // This function assigns roles and ids to each player
    _initializeGame(playerarray, roledict){
        var fascists = [];
        var idmsgs = [];
        // Loop over each player
        playerarray.forEach((player) => {
            var randomNr = Math.floor(Math.random() * roledict.length);
            
            // Assign a random role to each player from the given dictionary
            player._assignIdentity(roledict[randomNr]);

            // Print role to chat
            player._sendToPlayer('Role: ' + roledict[randomNr])
            player._sendToPlayer('Party: ' + player._getParty())
            
            // Store the fascists and create messages to announce them to co-players
            if ((roledict[randomNr]=='Fascist') || (roledict[randomNr]=='Hitler')){
                fascists.push(player)
                idmsgs.push(player._getName() + " has the identity: " + roledict[randomNr]);
            }

            // Remove role from array
            roledict.splice(randomNr, 1);
        });

        // Announce the ID's to the fascists
        fascists.forEach((fascist) => {
            // Check if the player is NOT hitler
            if (fascist._getIdentity != 'Hitler'){
                idmsgs.forEach((idmsg) => {
                    fascist._sendToPlayer(idmsg);
                });
            }
        });
    }
}


// This file doesn't get called in html so export manually
module.exports = SHGame;