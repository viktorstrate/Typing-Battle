var Battle = function () {

    var battle = this;

    // cache dom
    var $mainword = $('#main-word');
    var $nextword = $('#next-word');
    var $completed = $mainword.find('span').first();
    var $notcompleted = $mainword.find('span').last();
    var $yourScore = $('#your-score');
    var $yourScoreText = $yourScore.find('h2').first();
    var $theirScore = $('#their-score');
    var $theirScoreText = $theirScore.find('h2').first();
    var $timer = $('#timer');

    // variables
    var timeStarted = null;
    var correctLetters = 0;
    var totalTypes = 0;
    var misses = 0;
    var missLetters = {};
    var yourScore = 0;
    var theirScore = 0;
    var maxScore = 0;
    this.gameRunning = false;

    var tick = new Audio();
    tick.src = '/sounds/tick.mp3';

    var nextLetter = function () {
        return $notcompleted.html().charAt(0);
    };

    $(document).keypress(function (event) {
        if (!battle.gameRunning) return;
        var key = event.key || String.fromCharCode(event.keyCode);
        sendType(key);
        if (key == nextLetter()) {
            completeLetter();
            correctLetters += 1;
            totalTypes += 1;
            if (timeStarted == null) timeStarted = new Date();
        } else {
            misses += 1;
            if (missLetters[key] == null) {
                missLetters[key] = 0;
            }
            missLetters[key] = missLetters[key] + 1;
            totalTypes += 1;
        }

        if ($notcompleted.html() == '') {
            nextWord();
        }
    });


    var completeLetter = function () {
        $completed.html($completed.html() + $notcompleted.html().charAt(0));
        $notcompleted.html($notcompleted.html().replace(/^./g, ''));
    };

    var nextWord = function () {
        $completed.html('');
        $notcompleted.html($nextword.html());
        $nextword.html(getRandomWord());
    };

    var words = [];
    var getRandomWord = function () {
        return words.pop();
    };

    this.startCountdown = function (done) {
        $timer.html('3');
        tick.play();
        setTimeout(function () {
            $timer.html('2');
            tick.play();
            setTimeout(function () {
                $timer.html('1');
                tick.play();
                setTimeout(function () {
                    $timer.html('GO!');
                    $timer.fadeOut(3000);
                    done();
                }, 1000);

            }, 1000);

        }, 1000);
    };

    this.setWords = function (w) {
        words = w;
        $notcompleted.html(words.pop());
        $nextword.html(words.pop());
    };

    this.setMaxScore = function (s) {
        maxScore = s;
    };

    this.setYourScore = function (s) {
        yourScore = s;
        updateScoreGUI();
    };

    this.setTheirScore = function (s) {
        theirScore = s;
        updateScoreGUI();
    };

    var updateScoreGUI = function () {
        $yourScoreText.html(yourScore);
        $theirScoreText.html(theirScore);

        var yourGoal = yourScore / maxScore;
        var theirGoal = theirScore / maxScore;

        $yourScore.css('height', 'calc(90vh * ' + yourGoal + ')');
        $theirScore.css('height', 'calc(90vh * ' + theirGoal + ')');
    };

    $nextword.html(getRandomWord());

};

var battle;

$(document).ready(function () {
    battle = new Battle();
});

var id = window.location.pathname.split('/');
id = id[id.length - 1];