var init = function (app) {
    /* GET home page. */
    app.get('/battle/endless', function (req, res, next) {
        res.render('battle/endless', {});
    });

    app.get('/battle/unranked/:id', function (req, res) {
        var id = req.param.id;
        res.render('battle/unranked', {});
    });

};

module.exports = init;
