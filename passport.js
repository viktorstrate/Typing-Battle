var init = function(app){
    var localPassport = require('passport');
    var facebookPassport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var User = require('./models/user');

    // Local
    localPassport.use(new LocalStrategy(User.authenticate()));
    localPassport.serializeUser(User.serializeUser());
    localPassport.deserializeUser(User.deserializeUser());
    app.use(localPassport.initialize());
    app.use(localPassport.session());

    // Facebook
    facebookPassport.use(new FacebookStrategy({
        clientID: "476076729229992",
        clientSecret: "b55437d89cac4ae0991bc27f8198f69c",
        callbackURL: "http://typingbattle.net/auth/facebook/callback"
    }, function(accessToken, refreshToken, profile, done){
        console.log('Profile: ' + JSON.stringify(profile));
        User.find({'facebook.id': profile.id}, function(err, user){
            if(err){
                return done(err);
            }

            if(user.length==0){
                user = new User({
                    name: profile.displayName,
                    facebook: profile._json
                });
                user.save(function(err){
                    if(err) console.log(err);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        })
    }));
    facebookPassport.serializeUser(function(user, done) {
        done(null, user);
    });

    facebookPassport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    return {
        local: localPassport,
        facebook: facebookPassport
    };
};

module.exports = init;