var battle = function () {
    // cache dom
    var $mainword = $('#main-word');
    var $nextword = $('#next-word');
    var $completed = $mainword.find('span').first();
    var $notcompleted = $mainword.find('span').last();
    var $score = $('#timer');

    // variables
    var timeStarted = null;
    var correctLetters = 0;
    var totalTypes = 0;
    var misses = 0;
    var missLetters = {};
    var score = 0;

    var nextLetter = function () {
        return $notcompleted.html().charAt(0);
    };

    $(document).keypress(function (event) {
        var key = event.key;
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

        updateScore();
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

    var words = [
        'clover', 'juggle', 'innocent', 'tail', 'weight', 'plant', 'screw', 'friends',
        'travel', 'chess', 'thunder', 'design', 'accurate', 'language', 'earth', 'fear',
        'experience', 'calculator', 'wind', 'change', 'notebook', 'iron', 'baseball', 'death'
    ];
    var getRandomWord = function () {
        return words[Math.round(Math.random() * words.length - 1)];
    };

    $nextword.html(getRandomWord());

    var updateScore = function () {
        if (timeStarted == null) return;
        var timeSec = ((new Date().getTime()) - timeStarted.getTime()) / 1000;
        var timeMin = timeSec / 60;

        var apm = (correctLetters / timeMin);
        var accuracy = (1 - misses / totalTypes) || 1;

        console.log("APM: " + apm + ", Accuracy: " + accuracy);
        $score.html(Math.round(apm * accuracy));
    };

    setInterval(updateScore, 500);

};

$(document).ready(function () {
    battle();
});
