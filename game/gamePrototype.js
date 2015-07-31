var q = require('q');
var fs = require('fs');

var GamePrototype = {
    started: false,
    getWordList: function () {
        var deferred = q.defer();
        fs.readFile(process.cwd() + '/wordlist.txt', {encoding: 'utf8'}, function (err, data) {
            if (err) throw err;
            var words = data.split('\r\n');
            _wordlist = [];

            for (var i = 0; i < 50; i++) {
                _wordlist.push(words[Math.round(Math.random() * words.length)]);
            }

            deferred.resolve(_wordlist);
        });

        return deferred.promise;
    }
};

module.exports = GamePrototype;