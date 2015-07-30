'use strict';
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
                wordlist: _wordlist.slice(0) // slice to make a clone
            };

            _game.getSockets()[i].player.wordRemain = _game.getSockets()[i].player.wordlist.pop();

            _game.getSockets()[i].on('type', function (char) {

                if (!_game.getStarted()) return;


                if (char == this.player.wordRemain.charAt(0)) {
                    if (this.player.wordRemain.length > 1) {
                        this.player.wordRemain = this.player.wordRemain.replace(/^./g, '');
                    } else {
                        this.player.wordRemain = this.player.wordlist.pop();
                    }
                    this.player.score += 1;
                } else {
                    this.player.score -= 1;
                }

                this.emit('score', {
                    score: this.player.score
                });
            });
        }
    };

    return {
        game: _game
    };
};

UnrankedGame.prototype = Object.create(Game);

module.exports = UnrankedGame;