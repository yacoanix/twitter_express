const mongoose = require('mongoose');
var USERschema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    tweets: Array
});
var user = mongoose.model('user', USERschema);

module.exports = user;