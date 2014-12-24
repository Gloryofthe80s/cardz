'use strict';

// GAME CONSTRUCTOR
function Game() {
  this.initalize = function() {
    //create player, generate deck, shuffle that shiz, draw a damn hand
    player = new Player();
    player.deck = new Deck(defaultPlayerDeck);
    player.initializeOwnDeck();
    player.shuffleOwnReserveDeck();
    player.draw(player.maxHandSize);
  };

  this.startNewCombatRound = function() {
    this.currentCombatPhase.reset();
  };

  this.currentCombatPhase = {
    damageDealt : 0,

    reset : function() {
      this.damageDealt = 0;
    }
  };
}

// CARD CONSTRUCTOR
function Card(options) {
  this.name = options.name || 'Default';
  this.type = options.type || '';
  this.level = options.level || 1;
  this.maxLevel = options.maxLevel || 1;
  this.actionCost = options.actionCost || 0;
  this.actionsGained = options.actionsGained || 0;
  this.manaCost = options.manaCost || 0;
  this.manaGained = options.manaGained || 0;
  this.damageDealt = options.damageDealt || 0;
  this.damageType = options.damageType || 'basic';
}

// DECK CONSTRUCTOR
function Deck(options) {
  this.cards = options.cards || [];
}

// PLAYER CONSTRUCTOR
function Player(options) {
  options = options || {};
  var thePlayer = this;

  this.level = options.level || 1;
  this.experience = options.experience || 0;
  this.gold = options.gold || 0;
  this.life = options.life || 20;
  this.actions = options.actions || 1;
  this.maxHandSize = options.maxHandSize || 4;
  
  //convenience pile size queries
  // this.currentHandSize = this.hand.length;
  // this.currentDiscardPileSize = this.discardPile.length; 
  // this.currentReservePileSize = this.reservePile.length;

  //every card in the deck, regardless of where it's currently 'located'
  this.deck = options.deck || {};
  
  //temporal locations that cards can be
  this.hand = options.hand || [];
  this.discardPile = options.discardPile || [];
  this.reservePile = options.reservePile || [];

  this.initializeOwnDeck = function() {
    _.each(this.deck.cards, function(el) {
      thePlayer.reservePile.push(el);
    });
  };

  this.shuffleOwnReserveDeck = function() {
    _.shuffle(this.reservePile);
  };

  this.draw = function(howManyCards) {
    howManyCards = howManyCards || 1; 

    for (var i = 0; i < howManyCards; i++) {
      //take the card
      var theDrawnCard = _.last(this.reservePile);
      //add it to hand
      this.hand.push(theDrawnCard);
      //update the pile
      this.reservePile = _.initial(this.reservePile);
    }
  };
  
  //shuffles all cards in discard pile into the reserve pile
  this.recycle = function() {
    this.discardPile = this.discardPile.concat(this.reservePile);
    this.shuffleOwnReserveDeck();
  };
}

//------ PREP YO ASSETS ------//
var player;
var enemy;

//all the cards in the game
var basicAttackCard = {
  name : 'Attack',
  type : 'attack',
  level : 1,
  maxLevel : 5,
  actionCost : 0,
  actionGained : 0,
  manaCost : 0,
  manaGained : 0, 
  damageDealt : this.level,
  damageType : 'basic',
};

var basicManaCard = {
  name : 'Mana',
  type : 'mana',
  level : 1,
  maxLevel : 5,
  actionCost : 0,
  actionGained : 0,
  manaCost : 0,
  manaGained : 2, 
  damageDealt : 0,
  damageType : 'none',
};

var slashCard = {
  name : 'Slash',
  type : 'action',
  level : 1,
  maxLevel : 1,
  actionCost : 1,
  actionGained : 0,
  manaCost : 0,
  manaGained : 0, 
  damageDealt : 3,
  damageType : 'basic',
};

var fireballCard = {
  name : 'Fireball',
  type : 'spell',
  level : 1,
  maxLevel : 1,
  actionCost : 0,
  actionGained : 0,
  manaCost : 4,
  manaGained : 0, 
  damageDealt : 4,
  damageType : 'fire',
};

//the default deck that the player uses
var defaultPlayerDeck = {
  cards : [new Card(basicAttackCard), new Card(basicAttackCard), new Card(basicAttackCard), new Card(basicAttackCard),
           new Card(basicManaCard), new Card(basicManaCard), new Card(slashCard), new Card(fireballCard)]
};

// ------ START YER ENGINEZ ------//
var game = new Game();
game.initalize();

















