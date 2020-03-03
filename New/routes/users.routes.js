var express = require('express');
var router = express.Router();
var services = require('../controllers/user.controllers');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });

router.post('/register', function(req, res) {
    services.register(req, res)
});

router.post('/token', function(req, res) {
    services.tokeninn(req, res)
});

router.post('/login', function(req, res) {
    services.log_in(req, res)
});

router.get('/', function(req, res) {
    services.get_user(req, res)
});

router.put('/update', function(req, res) {
    services.update_user(req, res)
});

router.delete('/delete', function(req, res) {
    services.delete_user(req, res)
});

module.exports = router;