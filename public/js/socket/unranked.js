var sendType;
$(document).ready(function () {

    // cache dom
    var $popup = $('#popup');

    var unranked = io.connect(window.location.protocol + '//' + window.location.host + "/unranked");

    unranked.on('connect', function () {
        unranked.emit('init', {id: id});
    });

    unranked.on('start', function (data) {
        console.log('Game started');
        battle.setWords(data.wordlist);
        battle.setMaxScore(data.maxscore);

        $popup.hide();

    });

    unranked.on('status', function (data) {
        console.log(data.status);
    });

    unranked.on('score', function (score) {
        battle.setYourScore(score.yourScore);
        battle.setTheirScore(score.theirScore);
    });

    unranked.on('opponentLeft', function () {
        console.log('opponent left');
    });

    sendType = function (char) {
        unranked.emit('type', char);
    }

});