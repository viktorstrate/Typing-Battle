var init = function(app)
{
    /* GET home page. */
    app.get('/', function (req, res, next) {
        res.render('welcome', {title: 'Express'});

    });
};

module.exports = init;
