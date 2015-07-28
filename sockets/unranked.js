var init = function (io) {
    var unranked = io.of('/unranked');

    unranked.on('connection', function (socket) {
        console.log(socket);
        socket.emit('a message', {
            that: 'only'
            , '/chat': 'will get'
        });
    });

};

module.exports = init;