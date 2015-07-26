var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    email: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    facebook: Object
});

User.plugin(passportLocalMongoose);



module.exports = mongoose.model('User', User);