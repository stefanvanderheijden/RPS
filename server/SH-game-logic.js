// seven player game

class SHGame {
    constructor(players,leanPlayerArray){
        // underscore in de variabele is om aan te geven dat het private variabelen zijn
        this._players = players;
        this._hasBegun = true;

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
        this._lookingForChancellor = false;
        this._janeinState = false;
        
        // Vote counters
        this._jaNeinCounter = 0;
        this._jaNeinVotes = 0;
        this._electionTracker = 0;

        this._leanPlayerArray = leanPlayerArray;

    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Game states
    //////////////////////////////////////////////////////////////////////////////////////////////
 

    _getNumberOfPlayers(){
        return this._numberOfPlayers;
    }

    _setLookingForchancellor(bool){
        this._lookingForChancellor = bool;

        if (bool == true) {
            this._sendToPlayers(this._getPresidentCandidate()._getName() + " must choose a chancellor");
        }
        else if (bool == false){
            this._sendToPlayers(this._getChancellorCandidate()._getName() + " is chancellor candidate");
        } 
    }

    _setJaNeinState (bool) {
        this._janeinState = bool;

        if (bool == true) {
            this._sendToPlayers("Sie musst Ja oder Nein stimmen");
        }
        else if (bool == false){
            this._sendToPlayers("Sie konnte nicht mehr stimmen");
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Voting counters
    //////////////////////////////////////////////////////////////////////////////////////////////
    
    _addJaNeinToCount(vote){
        // Add the vote (0 or 1) to vote counter
        this._jaNeinCounter = this._jaNeinCounter + vote;
    }

    _getJaNeinCounter(){
        return this._jaNeinCounter;
    }

    _addJaNeinToVotes(){
        this._jaNeinVotes = this._jaNeinVotes + 1;
    }

    _getJaNeinVotingCount(){
        return this._jaNeinVotes;
    }

    _resetJaNeinCounters(){
        // Reset ja/nein counter and ja/nein voting count when voting has completed
        this._jaNeinCounter = 0;
        this._jaNeinVotes = 0;
    }

    _addToElectionTracker(){
        this._electionTracker = this._electionTracker + 1;
    }

    _getElectionTracker(){
        return this._electionTracker;
    }

    _resetElectionTracker(){
        this._electionTracker = 0;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Player functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    _setPresidentCandidate(player){
        this._presidentCandidate = player;
    }
    _getPresidentCandidate(){
        return this._presidentCandidate;
    }
    _setChancellorCandidate(player){
        this._chancellorCandidate = player;
    }
    _getChancellorCandidate(){
        return this._chancellorCandidate;
    }
    _setPresident(player){
        this._president = player;
    }
    _getPresident(){
        return this._president;
    }
    _setChancellor(player){
        this._setChancellor = player;
    }
    _getChancellor(){
        return this._chancellor;
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

    _resetHasVoted() {
        // Reset hasVoted state for each player
        
        this._players.forEach((player) => {
            player._setHasVoted(false);
        });
    }

    _updateRoles() {
        //this function assigns each player object the role that it has according to the game object data
        //this function updates the roles in the lean player array, used for graphics on client side
        
        this._players.forEach((player) => {
            if (player == this._getPresidentCandidate()){
                player._assignRole("presidentCandidate");
            }  else if (player == this._getChancellorCandidate()){
                player._assignRole("chancellorCandidate");
            } else if (player == this._getPresident()){
                player._assignRole("president");
            } else if (player == this._getChancellor()){
                player._assignRole("chancellor");
            }   else {
                player._assignRole(null);
            }
        });

        //Update the Lean player array
        var i;
        for (i = 0; i < this._leanPlayerArray.length; i++) {
          //update the leanPlayerArray with information from the 'real' player array
          this._leanPlayerArray[i].role = this._players[i]._getRole();
        };
        
        //Send the leanPlayerArray to all player object (and let them send it to the socket of that player)
        this._players.forEach((player) => {
            player._updateLeanPlayerList(this._leanPlayerArray);
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Game logic
    //////////////////////////////////////////////////////////////////////////////////////////////
   
    _startGameRound(){
        // start goverment election
        this._setLookingForchancellor(true);
        // Check win conditions
    }

    _voting(voter_name,vote_seatnr) {
        // this function received the name of the person who has voted 
        // and the seat number on which that person has voted.
        // this._sendToPlayers("test");
        // Are we looking for chancellor?
        if (this._lookingForChancellor == true) {   
            // Is the voter the president candidate?
            if (voter_name == this._getPresidentCandidate()._getName()) {
                

                // Get voter player object
                var voter = this._getPlayerByName(voter_name);
                this._sendToPlayers(voter._getName());
                // Get votee player object
                var votee = this._getPlayerBySeatNr(vote_seatnr);

                if ((voter != votee) && (vote_seatnr <= this._numberOfPlayers)){
                    this._setChancellorCandidate(votee);
                    this._sendToPlayers("The new candidate for chancellor is " + votee._getName());
                    this._updateRoles();
                    this._setLookingForchancellor(false);
                    this._setJaNeinState(true);
                } else {
                    voter._sendToPlayer('You did not enter a correct vote');
                }
            }
        }
    }

    _acceptJaNein(voter_name, voter_vote) {
        if (this._janeinState == true){
            var voter = this._getPlayerByName(voter_name);

            // Check whether the voter has already voted
            if (voter._getHasVoted() == false) {
                // Add vote to total vote count
                this._addJaNeinToCount(voter_vote);
                this._addJaNeinToVotes();
                voter._sendToPlayer("Your vote has been registriert")
                voter._setHasVoted(true);

                // Vote results (check if total vote count reached the amount of players)
                if (this._getJaNeinVotingCount() == this._getNumberOfPlayers()){
                // if (this._getJaNeinVotingCount() == 3){
                    
                    
                    if (this._getJaNeinCounter() > Math.floor(this._getNumberOfPlayers()/2)){
                    // if (this._getJaNeinCounter() > Math.floor(1.5) ){
                        this._sendToPlayers("The majority has voted yes");
                        // TODO: CHECK #RED POLICY CARDS + CHANCELLOR IS HITLER --> IF NOT HITLER + CNH LOGO (SEPARATE FUNCTION)
                        // set president and chancelllor, assign new candidate
                        this._resetElectionTracker();
                    } else {
                        this._sendToPlayers("The majority has voted no");
                        // Assign new candidate
                        // Increase election trackey by one
                        this._addToElectionTracker();
                    }

                    this._sendToPlayers("Voting has completed");

                    
                    // Reset ja/nein counters (plural)
                    this._resetJaNeinCounters();
                    // Reset has voted player state for each player
                    this._resetHasVoted();
                    // Set accepting votes to false
                    this._setJaNeinState(false);
                    // Enter policy selection state
                    // this._setPolicySelection(true);

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