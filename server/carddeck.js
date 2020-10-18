class cardDeck {
    constructor(){
        //Create an empty deck
        this._drawPile = [];
       
        //Determine nr of type of cards
        this._nrLibCards = 6;
        this._nrFasCards = 13;

        //create cards variables
        this._FCard = "fascist"
        this._LCard = "liberal"
       
        //Fill the deck with the cards
        this._createDeck(this._nrLibCards,this._nrFasCards);

        this._discardPile = []; 
    }

    _shuffleCards() {
            // for 1000 turns
            // switch the values of two random cards
            for (var i = 0; i < 1000; i++)
            {
                var location1 = Math.floor((Math.random() * this._drawPile.length));
                var location2 = Math.floor((Math.random() * this._drawPile.length));
                var tmp = this._drawPile[location1];

                this._drawPile[location1] = this._drawPile[location2];
                this._drawPile[location2] = tmp;
            }
        }

    _createDeck(nrLibCards,nrFasCards) {
    //clear the deck
        var tempdeck = [];
        var i = 0;
        for (i = 0; i < nrLibCards; i++) {
            tempdeck.push(this._LCard);
            }
        i = 0;
        for (i = 0; i < nrFasCards; i++) {
            tempdeck.push(this._FCard);
            } 
        
        this._drawPile = tempdeck;

        this._shuffleCards(); 
        }

    _checkEmptyDeck() {
        if (this._drawPile.length == 0) {
            //add the discardsDeck to the deck
            this._drawPile = this._discardPile;
            //shuffle the deck
            this._shuffleCards();
            //empty the discard deck
            this._discardPile = [];
        }
    }

    _drawThreeCards() {
        this._checkEmptyDeck();
        var card1 = this._drawPile.pop();
        this._checkEmptyDeck();
        var card2 = this._drawPile.pop();
        this._checkEmptyDeck();
        var card3 = this._drawPile.pop();
        
        var cards = [card1,card2,card3];

        return cards;
    }

    _drawOneCard() {
        this._checkEmptyDeck();
        var card = this._drawPile.pop();
        return card;
    }

    _discardCard(card) {
        this._discardPile.push(card);
        // this._showDiscardPile();
    }

    _showDiscardPile()
    {
        this._discardPile.forEach((card)=> {
            
            console.log(card);
        });
    }
}

module.exports = cardDeck;
    
