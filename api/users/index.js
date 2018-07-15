var express = require('express');
var router = express.Router();
const controller = require('./users.controller');


router.get('/', controller.getAll);
router.delete('/:id', controller.deleteByUs);
router.post('/', controller.create);
router.patch('/:id', controller.update);

module.exports = router