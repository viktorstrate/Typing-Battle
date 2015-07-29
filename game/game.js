var q = require('q');
var fs = require('fs');

var Game = function (id) {
    var _id = id;
    var _started = false;

    var _sockets = [];

    var setSockets = function (socket1, socket2) {
        _sockets = [socket1, socket2];
    };

    var getSockets = function () {
        return _sockets;
    };

    var getId = function () {
        return _id;
    };

    var getStarted = function () {
        return _started;
    };

    var setStarted = function (s) {
        _started = s;
    };

    var wordlist = null;
    var getWordList = function () {
        var deferred = q.defer();
        if (wordlist == null) {
            fs.readFile(process.cwd() + '\\wordlist.txt', {encoding: 'utf8'}, function (err, data) {
                if (err) throw err;
                console.log(data);
                deferred.resolve();
            });
        } else deferred.resolve(wordlist);

        return deferred.promise;
    };

    return {
        getStarted: getStarted,
        setStarted: setStarted,
        getId: getId,
        getSockets: getSockets,
        setSockets: setSockets,
        getWordList: getWordList
    };
};

module.exports = Game;