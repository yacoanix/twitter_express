
module.exports.getAll = getAll;
module.exports.deleteByUs = deleteByUs;
module.exports.create = create;
module.exports.update = update;

let user = require('./users.model');
var users;

user.find({}, (err, res) => {
    users = res;
})


function getAll(req, res) {
    setTimeout(function () {
        //return resp.json(users);
        res.render('users/user', {users : users})
    }, 1000);
}

function deleteByUs(req, res) {
    setTimeout(function () {
        const username = req.params.id;
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === username) {
                users.splice(i, 1);
                user.find({ username: username }).remove().exec();
                return res.json(username);
            }
        }
        return res.json(false);
    }, 1000);

}

function create(req, res) {         
    setTimeout(function () {
        const newUser = req.body;
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === newUser.username || users[i].email === newUser.email) {
                return res.json(false);
            }
        }
        users.push(newUser);
        var nuevo = new user(newUser)
        nuevo.save();
        return res.json(newUser);
    }, 1000);
}

function update(req, res) {
    setTimeout(function () {
        const username = req.params.id;
        const param = req.body;
        if (param.email) {
            users[buscaUser(username)].email = param.email;
            user.findOne({ "username": username }, (err, doc) => {
                doc.email = param.email;
                doc.save();
            })
            return res.json(true);
        } else if (param.name) {
            users[buscaUser(username)].name = param.name;
            user.findOne({ "username": username }, (err, doc) => {
                doc.name = param.name;
                doc.save();
            })
            return res.json(true);
        } else {
            return res.json(false);
        }
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