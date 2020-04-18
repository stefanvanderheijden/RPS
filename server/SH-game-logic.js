// seven player game

class SHGame {
    constructor(players){

       

        // underscore in de variabele is om aan te geven dat het private variabelen zijn
        this._players = players;

        this._sendToPlayers('Secret hitler starts!');
        
        var rolesIds7p = ['Hitler' , 'Fascist' , 'Fascist', 'Liberal' , 'Liberal' , 'Liberal' , 'Liberal'];
        this._initializeGame(this._players, rolesIds7p)

        //The variables below are filled with the names of the canidate (not the sockets or seatnrs)
        this._presidentCandidate = null;
        this._chancellorCandidate = null;
        this._president = null;
        this._chancellor = null;

        //when the game is initiated, the first thing is to start looking for a chancellor
        this._lookingForChancellor = true;

    }

    // a function that retrieves the players name by inputting the seatnr
    _getPlayerNameBySeatNr(seatNr) {
        var nameofvote = "";
        console.log("He voted on " + seatNr);
        this._players.forEach((player) => {
            console.log("checking a player on seat ..." + player._seatnr)
            if (player._seatnr == seatNr) {
                console.log("we have found the player " + player._name);
                nameofvote = player._name;   
            }
        });
        return nameofvote;
    }

    _voting(voter_name,vote_seatnr) {
        console.log(voter_name + "voted on seatnumber " + vote_seatnr);
        //this function received the name of the person who has voted 
        //and the seat number on which that person has voted.
        console.log('somebody has voted on seatnumber ' + vote_seatnr);
        //if we are currently looking for chancellor candidate:
        if (this._lookingForChancellor == true) {
            console.log('... and we are looking for a chancellor')
            //if the person who has voted is the current president candidate
            if (voter_name == this._presidentCandidate) {
                console.log('... and that person was indeed the president candidate')
                var votedname = this._getPlayerNameBySeatNr(vote_seatnr);
                console.log(votedname);
                this._chancellorCandidate = votedname;
                this._sendToPlayers("The new candidate for chancellor is " + votedname);
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