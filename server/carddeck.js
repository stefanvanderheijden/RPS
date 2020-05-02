class cardDeck {
    constructor(){
        //Create an empty deck
        this._deck = [];
       
        //Determine nr of type of cards
        this._nrLibCards = 6;
        this._nrFasCards = 11;

        //create cards variables
        this._FCard = "fascist"
        this._LCard = "liberal"
       
        //Fill the deck with the cards
        this._createDeck(this._nrLibCards,this._nrFasCards);

        this._discardDeck = []; 
    }

    _shuffleCards() {
            let count = this._deck.length;
            while(count) {
               this._deck.push(this._deck.splice(Math.floor(Math.random() * count), 1)[0]);
               count -= 1;
            }
            }

    _createDeck(nrLibCards,nrFasCards) {
    //clear the deck
        var tempdeck = [];
        var i = 0;
        for (i = 0; i < nrLibCards; i++) {
            tempdeck.push(this._Lcard);
            }
        i = 0;
        for (i = 0; i < nrFasCards; i++) {
            tempdeck.push(this._Fcard);
            }
        this._shuffleCards();  
        
        this._deck = tempdeck;
            }

    _checkEmptyDeck() {
        if (this._deck.length == 0) {
            //add the discardsDeck to the deck
            this._deck = this._discardDeck;
            //shuffle the deck
            this._shuffleCards();
            //empty the discard deck
            this._discardDeck = [];
        }
    }

    _drawThreeCards() {
        this._checkEmptyDeck();
        var card1 = this._deck.pop();
        this._checkEmptyDeck();
        var card2 = this._deck.pop();
        this._checkEmptyDeck();
        var card3 = this._deck.pop();

        var cards = [card1,card2,card3];

        return cards;
    }

    _drawOneCard() {
        this._checkEmptyDeck();
        var card = this._deck.pop();
        return card;
    }

    _discardCard(card) {
        this._discardDeck.push(card);
    }
}

module.exports = cardDeck;
    
