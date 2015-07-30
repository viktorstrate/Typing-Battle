var sendType;
$(document).ready(function () {
    var unranked = io.connect(window.location.protocol + '//' + window.location.host + "/unranked");

    unranked.on('connect', function () {
        unranked.emit('init', {id: id});
    });

    unranked.on('start', function (words) {
        console.log('Game started');
        battle.setWords(words);
    });

    unranked.on('status', function (data) {
        console.log(data.status);
    });

    unranked.on('score', function (score) {
        alert('SCORE: ' + score);
        // TODO make the score
    });

    unranked.on('opponentLeft', function () {
        console.log('opponent left');
    });

    sendType = function (char) {
        unranked.emit('type', char);
    }

});