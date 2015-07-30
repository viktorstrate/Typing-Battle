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

    var emitScore = function () {
        for (var i = 0; i < 2; i++) {
            var noti = i == 0 ? 1 : 0;
            _game.getSockets()[i].emit('score', {
                yourScore: _game.getSockets()[i].player.score,
                theirScore: _game.getSockets()[noti].player.score
            });
        }
    };

    var playerWon = function (number) {
        for (var i = 0; i < 2; i++) {
            if (i == number) {
                _game.getSockets()[i].emit('finish', {
                    won: true
                });
            } else {
                _game.getSockets()[i].emit('finish', {
                    won: false
                });
            }
        }
    };

    var start = function () {
        for (var i = 0; i < 2; i++) {
            console.log("HER");
            _game.getSockets()[i].emit('start', {
                wordlist: _wordlist,
                maxscore: 2500
            });
            _game.getSockets()[i].player = {
                score: 0,
                wordlist: _wordlist.slice(0), // slice to make a clone
                wordStreak: 0, // how many words without misses
                wordAce: true // true = no misses in current word
            };

            _game.getSockets()[i].player.wordRemain = _game.getSockets()[i].player.wordlist.pop();

            _game.getSockets()[i].on('type', function (char) {

                if (!_game.getStarted()) return;


                if (char == this.player.wordRemain.charAt(0)) {
                    if (this.player.wordRemain.length > 1) {
                        // if completed letter
                        this.player.wordRemain = this.player.wordRemain.replace(/^./g, '');
                    } else {
                        // if completed word
                        this.player.wordRemain = this.player.wordlist.pop();
                        this.player.score += 2;

                        if (this.player.wordAce) {
                            this.player.wordStreak += 1;
                        }

                        // reset word ace
                        this.player.wordAce = true;
                    }
                    this.player.score += 10 + ( this.player.wordStreak  );
                } else {
                    this.player.score -= 15;
                    this.player.wordAce = false;
                    this.player.wordStreak = 0;
                }

                emitScore();

                if (this.player.score >= this.player.maxscore) {

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