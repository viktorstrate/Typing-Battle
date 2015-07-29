var Game = require('./game');

var UnrankedGame = function (id, socket1, socket2) {
    var _game = new Game(id);
    var _wordlist;

    _game.setSockets(socket1, socket2);
    _game.getWordList().then(function (list) {
        _wordlist = list;
        start()
    });

    var start = function () {
        for (var i = 0; i < 2; i++) {
            console.log("HER");
            _game.getSockets()[i].emit('start', _wordlist);
            _game.getSockets()[i].player = {
                score: 0,
                wordlist: _wordlist
            };

            _game.getSockets()[i].on('type', function (char) {

                if (this.player.wordRemain == null) {
                    this.player.wordRemain = this.player.wordlist.pop();
                }

                if (char == this.player.wordRemain.charAt(0)) {
                    // TODO remove first letter
                    console.log("true");
                } else {
                    console.log("false");
                }
            });
        }
    };

    return {
        game: _game
    };
};

UnrankedGame.prototype = Object.create(Game);

module.exports = UnrankedGame;