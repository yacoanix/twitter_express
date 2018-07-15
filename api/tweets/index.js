var express = require('express');
var router = express.Router();
const controller = require('./tweets.controller');


//router.get('/', controller.getAll);
router.delete('/:id', controller.deleteById);
router.post('/', controller.create);
router.get('/:id', controller.getById);

module.exports = router