const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twitter');

module.exports.deleteById = deleteById;
module.exports.create = create;
module.exports.getById = getById;

var TWEETschema = mongoose.Schema({
    id: Number,
    tweet: String,
    owner: String,
    createdAt: Number
});
var USERschema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    tweets: Array
});

var tweet = mongoose.model('tweet', TWEETschema);
var tweets;

tweet.find({}, (err, res) => {
    tweets = res;
})

var user = mongoose.model('user', USERschema);
var users;

user.find({}, (err, res) => {
    users = res;
})


function create(req, res) {
    setTimeout(function () {
        var utcDate = Date.now();
        const text = req.body;
        ids = arrayId(tweets);
        text.id = (Math.max(...ids)) + 1;
        text.createdAt = utcDate;
        userPos = buscaUser(text.owner);
        if (userPos != null) {
            tweets.push(text);
            users[userPos].tweets.push(text.id);
            return res.json(text);
        } else {
            return res.json(false);
        }
    }, 1000);
}

function getById(req, res) {
    const id = req.params.id;
    for (let i = 0; i < tweets.length; i++) {
        console.log(tweets[i].id);
        if (tweets[i].id == id) {
            return res.json(tweets[i]);

        }
    }
    return res.json(false);
}

function deleteById(req, res) {
    const id = req.params.id;
    for (let i = 0; i < tweets.length; i++) {
        if (tweets[i].id == id) {
            tweets.splice(i, 1);
            return res.json(true);

        }
    }
    return res.json(false);
}

function buscaUser(user) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == user) {
            return i;
        } else {
            return null;
        }
    }
}

function arrayId(ids) {
    let array = [];
    for (let i = 0; i < ids.length; i++) {
        array.push(ids[i].id);
    }
    return array;
}