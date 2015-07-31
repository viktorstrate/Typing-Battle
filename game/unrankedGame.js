'use strict';

var gamePrototype = require('./gamePrototype');

var unrankedGame = Object.create(gamePrototype);

unrankedGame.emitScore = function () {
    var _unranked = this;
    for (var i = 0; i < 2; i++) {
        var noti = i == 0 ? 1 : 0;
        _unranked.sockets[i].emit('score', {
            yourScore: _unranked.sockets[i].player.score,
            theirScore: _unranked.sockets[noti].player.score
        });
    }
};

unrankedGame.playerWon = function (number) {
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

unrankedGame.start = function (wordlist) {
    var _unranked = this;
    for (var i = 0; i < 2; i++) {
        console.log("HER");
        _unranked.sockets[i].emit('start', {
            wordlist: wordlist,
            maxscore: 2500
        });
        _unranked.sockets[i].player = {
            score: 0,
            wordlist: wordlist.slice(0), // slice to make a clone
            wordStreak: 0, // how many words without misses
            wordAce: true // true = no misses in current word
        };

        _unranked.sockets[i].player.wordRemain = _unranked.sockets[i].player.wordlist.pop();

        _unranked.sockets[i].on('type', function (char) {
            var _socket = this;
            if (!_unranked.started) return;


            if (char == _socket.player.wordRemain.charAt(0)) {
                if (_socket.player.wordRemain.length > 1) {
                    // if completed letter
                    _socket.player.wordRemain = this.player.wordRemain.replace(/^./g, '');
                } else {
                    // if completed word
                    _socket.player.wordRemain = this.player.wordlist.pop();
                    _socket.player.score += 2;

                    if (_socket.player.wordAce) {
                        _socket.player.wordStreak += 1;
                    }

                    // reset word ace
                    _socket.player.wordAce = true;
                }
                _socket.player.score += 10 + ( this.player.wordStreak  );
            } else {
                _socket.player.score -= 15;
                _socket.player.wordAce = false;
                _socket.player.wordStreak = 0;
            }

            unrankedGame.emitScore.call(_unranked);

            if (_socket.player.score >= _socket.player.maxscore) {
                // TODO player won!
                console.log("Player won");
            }

        });
    }
};

unrankedGame.setup = function (_id, socket1, socket2) {
    var _unranked = this;
    this.id = _id;
    this.sockets = [socket1, socket2];

    gamePrototype.getWordList().then(function (list) {
        unrankedGame.start.call(_unranked, list);
    });

};

module.exports = unrankedGame;