var init = function (app) {
    /* GET home page. */
    app.get('/battle/training/endless', function (req, res, next) {
        res.render('battle', {});
    });
};

module.exports = init;
