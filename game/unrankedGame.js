var Game = require('./game');

var UnrankedGame = function (id, socket1, socket2) {
    var _game = new Game(id);
    _game.setSockets(socket1, socket2);
    _game.getWordList();
};

UnrankedGame.prototype = Object.create(Game);

module.exports = UnrankedGame;