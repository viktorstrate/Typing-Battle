function init(app, passport) {
    app.post('/auth/register', function (req, res, next) {
        User.register({username: req.body.username}, req.body.password, function (err, user) {
            if (err) {
                console.log(err);
                res.send('Error');
            }
            console.log(user);
        })
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

    app.get('/auth/facebook/', passport.facebook.authenticate('facebook', {scope: ['email', 'user_friends']}));

}

module.exports = init;
