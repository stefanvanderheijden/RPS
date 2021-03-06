// seven player game

const cardDeck = require('./carddeck');

class SHGame {
    constructor(players,leanPlayerArray){
        
        // underscore in de variabele is om aan te geven dat het private variabelen zijn
        this._players = players;
        this._hasBegun = true;

        this._sendToPlayers('----- Secret hitler starts! -----');
        
        // Dependent on number of players
        this._numberOfPlayers = players.length;

        var roles = [];
        switch(this._numberOfPlayers) {
            case 5:
                roles = ['Hitler' , 'Fascist' , 'Liberal' , 'Liberal' , 'Liberal'];
                this._hitlerMessage = "You are hitler, so you can not see the other fascist, but there is one out there!"
                this._liberalMessage = "You are a liberal. Hitler is out there with one fascist buddy!"
                break;
            case 6:
                roles = ['Hitler' , 'Fascist' ,'Liberal', 'Liberal', 'Liberal', 'Liberal'];
                this._hitlerMessage = "You are hitler, so you can not see the other fascist, but there is one out there!"
                this._liberalMessage = "You are a liberal. Hitler is out there with one fascist buddy!"
                break;
            case 7:
                roles = ['Hitler' , 'Fascist' , 'Fascist' ,'Liberal', 'Liberal', 'Liberal', 'Liberal'];
                this._hitlerMessage = "You are hitler, so you can not see the other fascists, but there are two out there!"
                this._liberalMessage = "You are a liberal. Hitler is out there with two fascist buddies!"
                break;
            case 8:
                roles = ['Hitler' , 'Fascist' , 'Fascist' ,'Liberal', 'Liberal', 'Liberal', 'Liberal', 'Liberal'];
                this._hitlerMessage = "You are hitler, so you can not see the other fascists, but there are two out there!"
                this._liberalMessage = "You are a liberal. Hitler is out there with two fascist buddies!"
                break;
            case 9:
                roles = ['Hitler' , 'Fascist' , 'Fascist' , 'Fascist' , 'Liberal', 'Liberal', 'Liberal', 'Liberal', 'Liberal'];
                this._hitlerMessage = "You are hitler, so you can not see the other fascists, but there are two three there!"
                this._liberalMessage = "You are a liberal. Hitler is out there with three fascist buddies!"
                break;
            case 10:
                roles = ['Hitler' , 'Fascist' , 'Fascist' , 'Fascist' , 'Liberal', 'Liberal', 'Liberal', 'Liberal', 'Liberal', 'Liberal'];
                this._hitlerMessage = "You are hitler, so you can not see the other fascists, but there are two three there!"
                this._liberalMessage = "You are a liberal. Hitler is out there with three fascist buddies!"
                break;
        }

        // Initialize game
        this._deck = null;
        this._initializeGame(this._players, roles)
        

        // The variables are filled with the player objects
        this._presidentCandidate = null;
        this._chancellorCandidate = null;
        this._president = null;
        this._chancellor = null; 

        // Game states - make separate class
        this._lookingForChancellor = false;
        this._janeinState = false;
        this._presidentCardSelection = false;
        this._chancellorCardSelection = false;
        
        // Vote counters
        this._jaNeinCounter = 0;
        this._jaNeinVotes = 0;
        this._electionTracker = 0;

        this._leanPlayerArray = leanPlayerArray;

    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Game states
    //////////////////////////////////////////////////////////////////////////////////////////////
 
    _initializeDeck(deck){
        this._deck = deck;
    }

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
            // this._sendToPlayers("Sie musst Ja oder Nein stimmen");
            this._sendToPlayers("You have to vote yes or no.");
        }
        else if (bool == false){
            // this._sendToPlayers("Sie konnte nicht mehr stimmen");
            this._sendToPlayers("You cannot vote anymore.");
        }
    }

    _setPresidentCardSelectionState (bool) {
        this._presidentCardSelection = bool;
        if (bool == true) {
            this._getPresident()._sendToPlayer("Discard one card");
        }
    }

    _setChancellorCardSelectionState (bool) {
        this._presidentCardSelection = false;
        this._chancellorCardSelection = bool;
        if (bool == true) {
            this._getChancellor()._sendToPlayer("Choose one card");
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////
    // Deck optns
    //////////////////////////////////////////////////////////////////////////////////////////////
    
    _getDeck(){
        return this._deck;
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

    _nextPresidentCandidate(){
        var players = this._players
        var presidentcandidate = this._getPresidentCandidate();
        var index = players.findIndex(player => player = presidentcandidate);
        console.log(index);
        if (index < players.length -1) {
            index = index + 1;
            console.log(index);
            console.log('index is increased by one');
        } else {
            console.log('index reached end of array, resetting to 0');
            index = 0;
        }
        this._setPresidentCandidate(this._players[index]);
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
        this._chancellor = player;
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

    _updateSocket(newPlayer) {

        var player = this._getPlayerByName(newPlayer._getName());
        var socket = newPlayer._socket;
        player._updateSocket(socket);

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
                // Add vote to the ja vs nein counter
                this._addJaNeinToCount(voter_vote);
                // Add vote to total vote count
                this._addJaNeinToVotes();
                // Change voter status to has voted
                voter._setHasVoted(true);
                // Store the vote
                voter._setMostRecentVote(voter_vote);


                // Vote results (check if total vote count reached the amount of players)
                if (this._getJaNeinVotingCount() == this._getNumberOfPlayers()){
                // if (this._getJaNeinVotingCount() == 3){
                    
                    if (this._getJaNeinCounter() > Math.floor(this._getNumberOfPlayers()/2)){
                        // if (this._getJaNeinCounter() > Math.floor(1.5) ){
                        this._sendToPlayers("The majority has voted yes");

                        this._sendVotesToClient();
                        // TODO: CHECK #RED POLICY CARDS + CHANCELLOR IS HITLER --> IF NOT HITLER + CNH LOGO (SEPARATE FUNCTION)
                        // TODO: president and chancelllor, assign new candidate

                        // set the president and chancellor to the previous candidates
                        this._setPresident(this._getPresidentCandidate());
                        this._setChancellor(this._getChancellorCandidate());

                        console.log("The new chancellor is player: " + this._getChancellor());

                        // set the candidates to zero
                        this._nextPresidentCandidate();
                        this._setChancellorCandidate(null);

                        this._updateRoles();
                        this._resetElectionTracker();
                        // Set president
                        
                        // Display the three president cards
                        this._enactFirstStage();
                    
                    } else {
                        this._sendToPlayers("The majority has voted no");
                        this._sendVotesToClient();
                        // TODO: Assign new candidate
                        this._nextPresidentCandidate();
                        this._setChancellorCandidate(null);

                        this._updateRoles();
                        // Increase election tracker by one
                        this._addToElectionTracker();
                    }
                    // Send votes to client

                    // Reset ja/nein counters (plural)
                    this._resetJaNeinCounters();
                    // Reset has voted player state for each player
                    this._resetHasVoted();
                    // Set accepting votes to false
                    this._setJaNeinState(false);

                }
            }  else {
                voter._sendToPlayer("You already voted")
            }              
        } else {
        }
    }



    _sendToPlayers(msg) {
       this._players.forEach((player) => {
           player._sendToPlayer(msg);
       });
    }

    // This function assigns roles and ids to each player
    _initializeGame(playerarray, roledict){
        
        //create new card deck
        let deck = new cardDeck();
        this._initializeDeck(deck);

        var fascists = [];
        var idmsgs = [];
        // Loop over each player
        playerarray.forEach((player) => {
            var randomNr = Math.floor(Math.random() * roledict.length);
            
            // Assign a random role to each player from the given dictionary
            player._assignIdentity(roledict[randomNr]);

            // Print role to chat
            player._sendToPlayer('Your role: ' + roledict[randomNr])
            player._sendToPlayer('Your party: ' + player._getParty())
            
            if (player._getParty() == "Liberal") {
                player._sendToPlayer(this._liberalMessage);
            }
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
            if (fascist._getIdentity() != 'Hitler'){
                idmsgs.forEach((idmsg) => {
                    fascist._sendToPlayer(idmsg);
                });
            }
            else {
                    fascist._sendToPlayer(this._hitlerMessage);
            }
            
        });
    }

    _sendVotesToClient(){
        var votes = []
        this._players.forEach((player) => {
            votes.push([player._getSeatNr(), player._getMostRecentVote() ] );
        });
        this._players.forEach((player) => {
            player._updateVotes(votes) ;
        });
    }

    // First stage of policy enaction, three cards are send to president
    _enactFirstStage(){
        this._getPresident()._sendCards(this._deck._drawThreeCards());
        // Set gamestate so that the card voting message is processed
        this._setPresidentCardSelectionState(true);
    }

    _cardsToChancellor(cards){
        var chancellor = this._getChancellor();
        chancellor._sendCards(cards);
        // Set 
    }
}


// This file doesn't get called in html so export manually
module.exports = SHGame;