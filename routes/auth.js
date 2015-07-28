function init(app, passport) {
    var User = require('../models/user');
    var q = require('q');

    app.post('/auth/register', function (req, res, next) {

        if (req.body.username.length < 3) {
            res.send({
                error: 'Username too short'
            });
            return;
        }

        if (req.body.password !== req.body.passwordRepeat) {
            res.send({
                error: 'Passwords doesn\'t match'
            });
            return;
        }

        var checkUsername = function () {
            var deffered = q.defer();
            User.find({username: req.body.username}, function (err, user) {

                if (user.length == 0) {
                    deffered.resolve(false);
                } else {
                    res.send({
                        error: 'Username already taken'
                    });
                    deffered.resolve(true);
                }
            });

            return deffered.promise;
        };

        checkUsername()
            .then(function (usernameTaken) {
                console.log(usernameTaken);
                if (!usernameTaken)
                    registerUser();
            });

        function registerUser() {
            User.register({
                username: req.body.username,
                email: req.body.email
            }, req.body.password, function (err, user) {
                if (err) {
                    console.log(err);
                    res.send('Error');
                }
                console.log(user);
                res.send({
                    success: true
                })
            });
        }
    });

    app.get('/auth/register', function (req, res) {
        res.render('register', {});
    });



    app.post('/auth/login/local', passport.local.authenticate('local'), function (req, res) {
        res.redirect('/');
    });

    app.get('/auth/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/facebook/callback', function(req, res){
        res.redirect('/');
    });

    app.get('/auth/facebook/', passport.facebook.authenticate('facebook', {scope: []}));

}

module.exports = init;
