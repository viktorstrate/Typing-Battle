/**
 *
 * @param socket the waiting socket
 * @param id the id of the waiting socket
 * @returns {{getSocket: Function, getId: Function}}
 * @constructor
 */
var Waiting = function (socket, id) {
    var _id = id;
    var _socket = socket;

    var getId = function () {
        return _id;
    };

    var getSocket = function () {
        return _socket;
    };

    return {
        getSocket: getSocket,
        getId: getId
    }
};

module.exports = Waiting;