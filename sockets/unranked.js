'use strict';
var init = function (io) {

    var Game = require('../game/unrankedGame');
    var Waiting = require('../game/waiting');

    var unranked = io.of('/unranked');

    var games = [];
    var waiting = [];

    unranked.on('connection', function (socket) {

        socket.on('disconnect', function () {
            for (var i = 0; i < waiting.length; i++) {
                if (waiting[i].getSocket() == socket) {
                    waiting.splice(i, 1);
                    console.log('User waiting disconnected');
                    break;
                }
            }

            for (var i = 0; i < games.length; i++) {
                for (var x = 0; x < 2; x++) {
                    if (games[i] == null) continue;
                    if (games[i].game.getSockets()[x] == socket) {
                        var notx = x == 0 ? 1 : 0;
                        games[i].game.getSockets()[notx].emit('opponentLeft');
                        games[i].game.setStarted(false);
                        games.splice(i, 1);
                        console.log('User left rnning game');
                    }
                }
            }
        });

        socket.on('init', function (data) {
            var foundPeer = false;
            for (var i = 0; i < waiting.length; i++) {
                if (waiting[i].getId() == data.id) {
                    setupGame(waiting[i].getSocket(), socket, data.id);
                    foundPeer = true;
                    console.log('Unranked match found: ' + data.id);
                }
            }
            if (!foundPeer) {
                waiting.push(new Waiting(socket, data.id));
                socket.emit('status', {status: 'waiting'});
                console.log('User waiting for unranked game: ' + data.id);
            }
        });

        socket.on('game', function (data) {
            if (data.type == 'type') {

            }
        });
    });

    var setupGame = function (socket1, socket2, id) {
        // remove old waiting sockets
        for (var i = 0; i < waiting.length; i++) {
            if (waiting[i].getSocket() == socket1 || waiting[i].getSocket() == socket2) {
                waiting.splice(i, 1);
            }
        }
        var game = new Game(id, socket1, socket2);
        game.game.setStarted(true);
        games.push(game);
        console.log('game started: ' + id);

    }

};

module.exports = init;