module.exports.deleteById = deleteById;
module.exports.create = create;
module.exports.getById = getById;

var tweet = require('./users.model');
var tweets;

tweet.find({}, (err, res) => {
    tweets = res;
})

var user = mongoose.model('user');
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
        console.log(users);
        if (userPos != null) {
            tweets.push(text);
            var nuevo = new tweet(text);
            nuevo.save();
            users[userPos].tweets.push(text.id);
            user.findOne({ "username": text.owner }, (err, doc) => {
                doc.tweets = users.tweets;
                doc.save();
            })
            return res.json(text);
        } else {
            return res.json(false);
        }
    }, 1000);
}

function getById(req, res) {
    setTimeout(function () {
        const id = req.params.id;
        for (let i = 0; i < tweets.length; i++) {
            if (tweets[i].id == id) {
                return res.json(tweets[i]);
            }
        }
        return res.json(false);
    }, 1000);
}

function deleteById(req, res) {
    setTimeout(function () {
        const id = req.params.id;
        for (let i = 0; i < tweets.length; i++) {
            if (tweets[i].id == id) {
                tweets.splice(i, 1);
                tweet.find({ "id": id }).remove().exec();
                return res.json(true);

            }
        }
        return res.json(false);
    }, 1000);
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