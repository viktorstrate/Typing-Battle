var init = function (app) {
    /* GET home page. */
    app.get('/battle/endless', function (req, res, next) {
        res.render('battle/endless', {});
    });

    app.get('/battle/unranked/:id', function (req, res) {
        var id = req.param.id;
        res.render('battle/unranked', {});
    });

    app.get('/battle/unranked/', function (req, res) {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        res.redirect('/battle/unranked/' + text);
    });

    app.get('/battle/', function (req, res) {
        res.render('battle/home', {});
    });

};

module.exports = init;
