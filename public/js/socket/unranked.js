var sendType;
$(document).ready(function () {

    // cache dom
    var $popup = $('#popup');
    var $popupTitle = $popup.find('h2').first();
    var $popupBody = $popup.find('p').first();

    var unranked = io.connect(window.location.protocol + '//' + window.location.host + "/unranked");

    unranked.on('connect', function () {
        unranked.emit('init', {id: id});
    });

    unranked.on('start', function (data) {
        console.log('gamePrototype started');

        $popup.hide();

        battle.startCountdown(function () {
            battle.setWords(data.wordlist);
            battle.setMaxScore(data.maxscore);
            battle.gameRunning = true;
        });


    });

    unranked.on('status', function (data) {
        console.log(data.status);
    });

    unranked.on('finish', function (data) {

        battle.gameRunning = false;

        if (data.won) {
            $popupTitle.html("You won!");
            $popupBody.html("You won the game, if you both reload the page the game will restart");
        } else {
            $popupTitle.html("You lost!");
            $popupBody.html("You lost the game, if you both reload the page the game will restart");
        }

        $popup.show();
        console.log("Won: " + data.won);
    });

    unranked.on('score', function (score) {
        battle.setYourScore(score.yourScore);
        battle.setTheirScore(score.theirScore);
    });

    unranked.on('opponentLeft', function () {
        battle.gameRunning = false;
        $popupTitle.html("Opponent left the game.");
        $popupBody.html("Your opponent left the game while it was still running");
        $popup.show();
    });

    sendType = function (char) {
        unranked.emit('type', char);
    }

});