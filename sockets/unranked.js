'use strict';
var init = function (io) {

    var Game = require('../game/game');
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
                    if (games[i].getSockets[x] == socket) {
                        games.splice(i, 1);
                        console.log('User left running game');
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
                    console.log('User joined a unranked game: ' + data.id);
                }
            }
            if (!foundPeer) {
                waiting.push(new Waiting(socket, data.id));
                socket.emit('status', {status: 'waiting'});
                console.log('User waiting for unranked game: ' + data.id);
            }
        })
    });

    var setupGame = function (socket1, socket2, id) {
        for (var i = 0; i < waiting.length; i++) {
            if (waiting[i].getSocket() == socket1 || waiting[i].getSocket() == socket2) {
                waiting.splice(i, 1);
            }
        }
        var game = new Game(id);
        game.setSockets(socket1, socket2);
        games.push(game);
        console.log('game started: ' + id);

    }

};

module.exports = init;