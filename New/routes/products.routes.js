var express = require('express')
var router = express.Router();
var services = require('../controllers/product.controllers')

router.post('/create', function(req, res) {
    services.create_product(req, res);
})

router.put('/update/:id', function(req, res) {
    services.update_product(req, res);
})

router.get('/', function(req, res) {
    services.show_user_products(req, res);
})

module.exports = router;