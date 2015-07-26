var init = function(app)
{
    app.get('/about', function (req, res, next) {
        res.render('about');

    });
};

module.exports = init;
