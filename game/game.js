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

    return {
        getStarted: getStarted,
        setStarted: setStarted,
        getId: getId,
        getSockets: getSockets,
        setSockets: setSockets
    };
};

module.exports = Game;