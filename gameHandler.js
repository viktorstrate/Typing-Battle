var pendingGames = {
    unranked: []
};

var UnrankedPending = function (foundCallback) {

    this.id = makeid();
    this.found = function () {
        foundCallback();
    };

    function makeid() {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
};

module.exports = {
    pendingGames: pendingGames,
    instance: {
        UnrankedPending: UnrankedPending
    }
};