const mongoose = require('mongoose');
var TWEETschema = mongoose.Schema({
    id: Number,
    tweet: String,
    owner: String,
    createdAt: Number
});

var tweet = mongoose.model('tweet', TWEETschema);

module.exports = tweet;